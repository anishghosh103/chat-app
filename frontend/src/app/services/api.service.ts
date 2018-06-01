import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  private userApi = '/api/users';
  private roomApi = '/api/rooms';

  constructor(
    private http: HttpClient
  ) { }

  // Users Service

  login(user: any) {
    return this.http.post(`${this.userApi}/login`, user);
  }

  signup(user: any) {
    return this.http.post(`${this.userApi}/signup`, user);
  }

  activateAccount(token: String) {
    return this.http.put(`${this.userApi}/activate`, { token });
  }

  forgotPassword(username: String) {
    return this.http.post(`${this.userApi}/${username}/forgot-password`, {});
  }

  resetPassword(userId: string, password: string) {
    return this.http.put(`${this.userApi}/${userId}/reset-password`, { password });
  }

  logout() {
    return this.http.post(`${this.userApi}/logout`, {});
  }

  getRoomsOfCurrentUser() {
    return this.http.get(`${this.userApi}/${localStorage.getItem('userId')}/rooms`);
  }

  getUserById(userId: string) {
    return this.http.get(`${this.userApi}/${userId}`);
  }

  // Rooms Service

  getRoomById(roomId: String) {
    return this.http.get(`${this.roomApi}/${roomId}`);
  }

  getActiveRooms() {
    return this.http.get(`${this.roomApi}/active`);
  }

  getRoomUpdates(roomId: String, skip = 0, limit = 20) {
    return this.http.get(`${this.roomApi}/${roomId}/updates?skip=${skip}&limit=${limit}`);
  }

  createRoom(room: any) {
    return this.http.post(`${this.roomApi}/`, room);
  }

  updateRoomDetails(roomId: string, roomDetails: any) {
    return this.http.put(`${this.roomApi}/${roomId}`, roomDetails);
  }

  deleteRoom(roomId: String) {
    return this.http.delete(`${this.roomApi}/${roomId}`);
  }

  activateRoom(roomId: String) {
    return this.http.put(`${this.roomApi}/${roomId}/activate`, {});
  }

  deactivateRoom(roomId: String) {
    return this.http.put(`${this.roomApi}/${roomId}/deactivate`, {});
  }

  joinRoom(roomId: String) {
    return this.http.put(`${this.roomApi}/${roomId}/join`, {});
  }

  leaveRoom(roomId: String) {
    return this.http.put(`${this.roomApi}/${roomId}/leave`, {});
  }

  sendMessage(roomId: String, message: String) {
    return this.http.post(`${this.roomApi}/${roomId}/send-message`, {message});
  }

  updateLastViewed(roomId: String) {
    return this.http.put(`${this.roomApi}/${roomId}/update-last-viewed`, { lastViewed: Date.now() });
  }

  sendInviteLink(roomId: string, email: string) {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.roomApi}/${roomId}/send-invite-link`, { email })
        .subscribe(
          (response: any) => {
            if (response.status === 200) {
              resolve();
            } else {
              reject(response.message);
            }
          },
          err => reject('Please try again.')
        );
    });
  }

}
