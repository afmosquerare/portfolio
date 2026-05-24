import { Component, inject, OnInit, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { MessageService } from '@core/services/message.service';
import { Message } from '@core/models/message.model';
import { NotifierService } from '@shared/services/notifier.service';
import { ConfirmService } from '@shared/services/confirm.service';
import { PageHeaderComponent } from '@shared/components/page-header.component';
import { TableSkeletonComponent } from '@shared/components/table-skeleton.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, TableSkeletonComponent],
  templateUrl: './messages.html'
})
export default class Messages implements OnInit {
  messageService = inject(MessageService);
  notifierService = inject(NotifierService);
  confirmService = inject(ConfirmService);

  messagesResource = rxResource({
    stream: () => this.messageService.getMessages()
  });

  selectedMessage = signal<Message | null>(null);

  ngOnInit() {
  }

  markAsRead(id: number) {
    this.messageService.markAsRead(id).subscribe(() => {
      this.messagesResource.reload();
      this.notifierService.success('Message marked as read');
    });
  }

  viewMessage(msg: Message) {
    this.selectedMessage.set(msg);
    if (!msg.isRead) {
      this.markAsRead(msg.id);
    }
    (document.getElementById('view_msg_modal') as HTMLDialogElement).showModal();
  }

  deleteMessage(id: number) {
    this.confirmService.open({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this message? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      onConfirm: () => {
        this.messageService.deleteMessage(id).subscribe(() => {
          this.messagesResource.reload();
          this.notifierService.success('Message deleted');
        });
      }
    });
  }
}
