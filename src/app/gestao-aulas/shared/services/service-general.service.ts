import { Injectable } from '@angular/core';
import { Account } from '../models/account/account';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from 'src/app/core/services/user-service/user-service.service';
import { Edition } from '../models/edition/edition';
import { Lesson } from '../models/lesson/lesson';
import { Note } from '../models/note/note';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceGeneralService {

  private url = 'http://localhost:8080/coreFinalProject/aulas/accounts/'

  public currentAccount: Account = new Account();
  public currentAccount$: ReplaySubject<Account> = new ReplaySubject(1);
  private accountId$: ReplaySubject<number> = new ReplaySubject();
  private edtions: Edition[];


  constructor(
    private router: Router,
    private userApi: UserServiceService,
    private http: HttpClient,
  ) {
    /*   console.log(this.userApi.currentUser$); */

    this.currentAccount.userID = this.userApi.getCurrentUser().id;
    this.getAccount().subscribe(
      (account: Account) => {
        this.currentAccount = account;
        this.currentAccount$.next(account);
        this.accountId$.next(account.id);
        console.log(this.currentAccount);

      }
    );

  }

  public getAccount() {
    return this.http.get(this.url + 'user/' + this.currentAccount.userID);
  }



  // public getEditions() {
  //   return this.simulation
  // }
  // public getLessons(){
  //   return this.simulationLessons
  // }

  /**
   * getCurrentAccountId
   */
  public getCurrentAccountId() {
    return this.currentAccount.id;
  }

  /**
   * getCurrentAccount
   */
  public getCurrentAccount() {
    console.log('-------->' + this.currentAccount);
    return this.currentAccount;
  }

  /**
   * getCurrentAccountLessons
   */
  public getCurrentAccountLessons() {
    return this.currentAccount.editions[0].lessonsIds;
  }

  // public getNotes () {
  //   return this.simulationNotes;
  // }

  // public simulation: Array<Edition> = [
  //   {
  //     'id': 1,
  //     'name': "java1",
  //     'type': "java",
  //     'accountIds': [],
  //     'lessonsIds': [],
  //     'notesIds': [],
  //     'questionsIds': [],
  //     'eventsIds': []

  //   }, {
  //     'id': 2,
  //     'name': 'java2',
  //     'type': "java",
  //     'accountIds': [],
  //     'lessonsIds': [],
  //     'notesIds': [],
  //     'questionsIds': [],
  //     'eventsIds': []

  //   }, {
  //     'id': 3,
  //     'name': 'Batatas3',
  //     'type': "java",
  //     'accountIds': [],
  //     'lessonsIds': [],
  //     'notesIds': [],
  //     'questionsIds': [],
  //     'eventsIds': []
  //   }, {
  //     'id': 4,
  //     'name': 'Cebolas4',
  //     'type': "java",
  //     'accountIds': [],
  //     'lessonsIds': [],
  //     'notesIds': [],
  //     'questionsIds': [],
  //     'eventsIds': []
  //   }
  // ];

  // public simulationLessons: Array<Lesson> = [
  //   {
  //     'id': 1,
  //     'name': "html",
  //     'description': " ola coisas",
  //     'materials': [1, 2],
  //     'notesIds': [1, 2],

  //   }, {
  //     'id': 2,
  //     'name': "css",
  //     'description': " ainda mal estamos ca",
  //     'materials': [1, 2],
  //     'notesIds': [1, 2],

  //   }, {
  //     'id': 3,
  //     'name': "java",
  //     'description': " ainda ca estou",
  //     'materials': [1, 2],
  //     'notesIds': [1, 2],
  //   }, {
  //     'id': 4,
  //     'name': "angular",
  //     'description': " adeus",
  //     'materials': [1, 2],
  //     'notesIds': [1, 2],
  //   }
  // ];
}
