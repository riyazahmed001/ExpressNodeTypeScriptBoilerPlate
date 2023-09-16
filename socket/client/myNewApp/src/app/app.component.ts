import { Component, OnInit  } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myNewApp';
  private socket: any;

  data: any = '';

  constructor() {}

  ngOnInit() {
    this.socket = io('http://localhost:3000');
    
    this.socket.on('dataUpdate', (data: any) => {
        this.data = JSON.stringify(data);
        this.sendDataToServer();
    });

    this.socket.on('responseToClient', (data: any) => {
      console.log("data received back" , data);
      console.log("data sent back to server app");  
    });
  }

  sendDataToServer() {
    // Send data to the server when a button is clicked
    this.socket.emit('dataForClient', { message: 'Hello, Server!' });
  }
  
  ngOnDestroy() {
    // Disconnect from the WebSocket server when the component is destroyed
    this.socket.disconnect();
  }
}
