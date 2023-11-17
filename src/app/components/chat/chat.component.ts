import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { MainServiceService } from 'src/app/services/main-service.service';
import { Socket } from 'ngx-socket-io'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  users!: any;
  messages!: any;
  oponent!: any;
  userid!: any;
  message!: any
  pair!: string;
  connectionId: any;
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(
    private socket :Socket,
    private service: MainServiceService,
    private chatService : ChatServiceService
  ) { }
 
  ngOnInit(): void {
    this.service.allUser().subscribe({
      next: (res:any) => {
        this.users = res.connections;
        this.socket.emit('setup', res.user_id);
      }, error: (err) => {
        console.log(err);
      }
    })

    this.socket.on('messageReceived',(newMessage:any)=>{   
      if (this.pair == newMessage.sender) {
        this.messages.push(newMessage);
      }
    })

  }

  ngAfterViewChecked(): void {
    this.scrollToBottom()
  }
private scrollToBottom(): void {
  try {
    this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  } catch (err) {
    console.log(err);
  }
}


  getFullChat(id: any) { 
    this.pair = id
    this.service.getUser(id).subscribe({
      next: (res:any) => {
       this.oponent = res.name
      }, error: (err) => {
        console.log(err);
        
      }
    })
    this.chatService.getFullChat(id).subscribe({
      next: (res:any) => {
        
      this.socket.emit('join',res.cid) 
      this.messages = res.result
      this.connectionId=res.cid
        this.userid = res.userId
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  sendMessage() { 
    if (this.message.trim() === '') {
      // this.message = "enter something"
    } else {
      const data = {
        connectionid: this.connectionId,
        sender: this.userid,
        message: this.message
      }
      this.chatService.sendMessages(data).subscribe({
        next: (res: any) => {
          this.message = '',
          this.messages.push(res)
          this.socket.emit('chatMessage',res)
        },error: (err: any) => {
          console.log(err);
        }
      })
    }
  }
  
 
}
