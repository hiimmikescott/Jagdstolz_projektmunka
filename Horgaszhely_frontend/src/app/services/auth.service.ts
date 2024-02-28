import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://127.0.0.1:8000/api";
  loggedIn: boolean = false;
  private userToken: string | null = null;

  constructor(private http: HttpClient) {
    const storedToken = this.getCookieValue('userToken');
    if (storedToken) {
      this.loggedIn = true;
    }
  }

  createUser(email: string, name: string, password: string, birthdate: Date): Observable<any> {
    const userData = { email, name, password, birthdate };
    return this.http.post(`${this.url}/userregister`, userData);
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.url}/userlogin`, loginData).pipe(
      tap((response: any) => {
        if (response.token) {
          this.setCookie('userToken', response.token, 7, 'yourdomain.com', '/'); // Adjust domain and path accordingly
          this.loggedIn = true;
        }
      })
    );
  }

  logout(): Observable<any> {
    const token = this.getCookieValue('token');

    if (!token) {
      console.error('Token not found in cookies.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.deleteCookie('token');

    return this.http.post<any>(`${this.url}/userlogout`, {}, { headers });
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  clearUserData(): void {
    this.userToken = null;
    this.loggedIn = false;
  }

  setCookie(name: string, value: string, days: number, domain: string, path: string): void {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    const domainString = domain ? `;domain=${domain}` : '';
    const pathString = path ? `;path=${path}` : '';
    document.cookie = `${name}=${value};${expires}${domainString}${pathString}`;
  }

  private getCookieValue(cookieName: string): string {
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return '';
  }

  private deleteCookie(cookieName: string): void {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
{success: true, data: {…}, message: 'Sikeres bejelentkezés'}data: {token: '16|iBtdB04FDG6vNGAKgQlBqyQl4zgEg9GiAEVZ0bP7894fa213', name: 'Vitovszki Tamás'}message: "Sikeres bejelentkezés"success: true[[Prototype]]: Object
auth.service.ts:42 Token not found in cookies.
logout @ auth.service.ts:42
logout @ nav.component.ts:27
NavComponent_button_16_Template_button_click_0_listener @ nav.component.html:22
executeListenerWithErrorHandling @ core.mjs:26043
wrapListenerIn_markDirtyAndPreventDefault @ core.mjs:26076
(anonymous) @ platform-browser.mjs:749
invokeTask @ zone.js:402
(anonymous) @ core.mjs:15290
onInvokeTask @ core.mjs:15290
invokeTask @ zone.js:401
onInvokeTask @ core.mjs:15603
invokeTask @ zone.js:401
runTask @ zone.js:173
invokeTask @ zone.js:483
invokeTask @ zone.js:1642
globalCallback @ zone.js:1673
globalZoneAwareCallback @ zone.js:1706
Zone - HTMLButtonElement.addEventListener:click (async)
onScheduleTask @ core.mjs:15284
scheduleTask @ zone.js:382
onScheduleTask @ zone.js:279
scheduleTask @ zone.js:382
scheduleTask @ zone.js:216
scheduleEventTask @ zone.js:242
(anonymous) @ zone.js:1959
addEventListener @ platform-browser.mjs:850
addEventListener @ platform-browser.mjs:210
listen @ platform-browser.mjs:731
listenerInternal @ core.mjs:26000
ɵɵlistener @ core.mjs:25881
NavComponent_button_16_Template @ nav.component.html:22
executeTemplate @ core.mjs:10537
renderView @ core.mjs:11738
createAndRenderEmbeddedLView @ core.mjs:11806
createEmbeddedViewImpl @ core.mjs:12702
createEmbeddedView @ core.mjs:16911
_updateView @ common.mjs:3693
set ngIf @ common.mjs:3667
applyValueToInputField @ core.mjs:5805
writeToDirectiveInput @ core.mjs:10365
setInputsForProperty @ core.mjs:11660
elementPropertyInternal @ core.mjs:10961
ɵɵproperty @ core.mjs:21752
NavComponent_Template @ nav.component.html:22
executeTemplate @ core.mjs:10537
refreshView @ core.mjs:12100
detectChangesInView @ core.mjs:12324
detectChangesInViewIfAttached @ core.mjs:12287
detectChangesInComponent @ core.mjs:12276
detectChangesInChildComponents @ core.mjs:12337
refreshView @ core.mjs:12150
detectChangesInView @ core.mjs:12324
detectChangesInViewIfAttached @ core.mjs:12287
detectChangesInComponent @ core.mjs:12276
detectChangesInChildComponents @ core.mjs:12337
refreshView @ core.mjs:12150
detectChangesInView @ core.mjs:12324
detectChangesInViewWhileDirty @ core.mjs:12041
detectChangesInternal @ core.mjs:12023
detectChangesInView @ core.mjs:32385
detectChangesInAttachedViews @ core.mjs:32357
tick @ core.mjs:32329
(anonymous) @ core.mjs:32681
invoke @ zone.js:368
onInvoke @ core.mjs:15616
invoke @ zone.js:367
run @ zone.js:129
run @ core.mjs:15467
next @ core.mjs:32680
ConsumerObserver2.next @ Subscriber.js:96
Subscriber2._next @ Subscriber.js:63
Subscriber2.next @ Subscriber.js:34
(anonymous) @ Subject.js:41
errorContext @ errorContext.js:19
Subject2.next @ Subject.js:31
emit @ core.mjs:115
checkStable @ core.mjs:15535
onHasTask @ core.mjs:15633
hasTask @ zone.js:422
_updateTaskCount @ zone.js:443
_updateTaskCount @ zone.js:272
runTask @ zone.js:190
drainMicroTaskQueue @ zone.js:581
invokeTask @ zone.js:487
invokeTask @ zone.js:1642
globalCallback @ zone.js:1685
globalZoneAwareCallback @ zone.js:1706
load (async)
customScheduleGlobal @ zone.js:1790
scheduleTask @ zone.js:389
onScheduleTask @ core.mjs:15285
scheduleTask @ zone.js:382
onScheduleTask @ zone.js:279
scheduleTask @ zone.js:382
scheduleTask @ zone.js:216
scheduleEventTask @ zone.js:242
(anonymous) @ zone.js:1959
(anonymous) @ http.mjs:2360
Observable2._trySubscribe @ Observable.js:38
(anonymous) @ Observable.js:32
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ switchMap.js:14
OperatorSubscriber2._this._next @ OperatorSubscriber.js:15
Subscriber2.next @ Subscriber.js:34
(anonymous) @ innerFrom.js:51
Observable2._trySubscribe @ Observable.js:38
(anonymous) @ Observable.js:32
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ switchMap.js:10
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ finalize.js:5
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ finalize.js:5
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
doInnerSub @ mergeInternals.js:19
outerNext @ mergeInternals.js:14
OperatorSubscriber2._this._next @ OperatorSubscriber.js:15
Subscriber2.next @ Subscriber.js:34
(anonymous) @ innerFrom.js:51
Observable2._trySubscribe @ Observable.js:38
(anonymous) @ Observable.js:32
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
mergeInternals @ mergeInternals.js:53
(anonymous) @ mergeMap.js:14
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ filter.js:6
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ map.js:6
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ tap.js:15
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
login @ login-modal.component.ts:20
LoginModalComponent_Template_button_click_12_listener @ login-modal.component.html:12
executeListenerWithErrorHandling @ core.mjs:26043
wrapListenerIn_markDirtyAndPreventDefault @ core.mjs:26076
(anonymous) @ platform-browser.mjs:749
invokeTask @ zone.js:402
(anonymous) @ core.mjs:15290
onInvokeTask @ core.mjs:15290
invokeTask @ zone.js:401
onInvokeTask @ core.mjs:15603
invokeTask @ zone.js:401
runTask @ zone.js:173
invokeTask @ zone.js:483
invokeTask @ zone.js:1642
globalCallback @ zone.js:1673
globalZoneAwareCallback @ zone.js:1706
Zone - HTMLButtonElement.addEventListener:click (async)
onScheduleTask @ core.mjs:15284
scheduleTask @ zone.js:382
onScheduleTask @ zone.js:279
scheduleTask @ zone.js:382
scheduleTask @ zone.js:216
scheduleEventTask @ zone.js:242
(anonymous) @ zone.js:1959
addEventListener @ platform-browser.mjs:850
addEventListener @ platform-browser.mjs:210
listen @ platform-browser.mjs:731
listenerInternal @ core.mjs:26000
ɵɵlistener @ core.mjs:25881
LoginModalComponent_Template @ login-modal.component.html:12
executeTemplate @ core.mjs:10537
renderView @ core.mjs:11738
renderComponent @ core.mjs:11685
renderChildComponents @ core.mjs:11786
renderView @ core.mjs:11766
create @ core.mjs:16583
createComponent @ core.mjs:35778
_createFromComponent @ ng-bootstrap.mjs:9896
_getContentRef @ ng-bootstrap.mjs:9867
open @ ng-bootstrap.mjs:9796
open @ ng-bootstrap.mjs:10003
openLoginModal @ nav.component.ts:23
NavComponent_button_15_Template_button_click_0_listener @ nav.component.html:21
executeListenerWithErrorHandling @ core.mjs:26043
wrapListenerIn_markDirtyAndPreventDefault @ core.mjs:26076
(anonymous) @ platform-browser.mjs:749
invokeTask @ zone.js:402
(anonymous) @ core.mjs:15290
onInvokeTask @ core.mjs:15290
invokeTask @ zone.js:401
onInvokeTask @ core.mjs:15603
invokeTask @ zone.js:401
runTask @ zone.js:173
invokeTask @ zone.js:483
invokeTask @ zone.js:1642
globalCallback @ zone.js:1673
globalZoneAwareCallback @ zone.js:1706
Zone - HTMLButtonElement.addEventListener:click (async)
onScheduleTask @ core.mjs:15284
scheduleTask @ zone.js:382
onScheduleTask @ zone.js:279
scheduleTask @ zone.js:382
scheduleTask @ zone.js:216
scheduleEventTask @ zone.js:242
(anonymous) @ zone.js:1959
addEventListener @ platform-browser.mjs:850
addEventListener @ platform-browser.mjs:210
listen @ platform-browser.mjs:731
listenerInternal @ core.mjs:26000
ɵɵlistener @ core.mjs:25881
NavComponent_button_15_Template @ nav.component.html:21
executeTemplate @ core.mjs:10537
renderView @ core.mjs:11738
createAndRenderEmbeddedLView @ core.mjs:11806
createEmbeddedViewImpl @ core.mjs:12702
createEmbeddedView @ core.mjs:16911
_updateView @ common.mjs:3693
set ngIf @ common.mjs:3667
applyValueToInputField @ core.mjs:5805
writeToDirectiveInput @ core.mjs:10365
setInputsForProperty @ core.mjs:11660
elementPropertyInternal @ core.mjs:10961
ɵɵproperty @ core.mjs:21752
NavComponent_Template @ nav.component.html:21
executeTemplate @ core.mjs:10537
refreshView @ core.mjs:12100
detectChangesInView @ core.mjs:12324
detectChangesInViewIfAttached @ core.mjs:12287
detectChangesInComponent @ core.mjs:12276
detectChangesInChildComponents @ core.mjs:12337
refreshView @ core.mjs:12150
detectChangesInView @ core.mjs:12324
detectChangesInViewIfAttached @ core.mjs:12287
detectChangesInComponent @ core.mjs:12276
detectChangesInChildComponents @ core.mjs:12337
refreshView @ core.mjs:12150
detectChangesInView @ core.mjs:12324
detectChangesInViewWhileDirty @ core.mjs:12041
detectChangesInternal @ core.mjs:12023
detectChangesInView @ core.mjs:32385
detectChangesInAttachedViews @ core.mjs:32357
tick @ core.mjs:32329
_loadComponent @ core.mjs:32409
bootstrap @ core.mjs:32305
(anonymous) @ core.mjs:33091
_moduleDoBootstrap @ core.mjs:33091
(anonymous) @ core.mjs:33061
invoke @ zone.js:368
onInvoke @ core.mjs:15616
invoke @ zone.js:367
run @ zone.js:129
(anonymous) @ zone.js:1257
invokeTask @ zone.js:402
(anonymous) @ core.mjs:15290
onInvokeTask @ core.mjs:15290
invokeTask @ zone.js:401
onInvokeTask @ core.mjs:15603
invokeTask @ zone.js:401
runTask @ zone.js:173
drainMicroTaskQueue @ zone.js:581
Zone - Promise.then (async)
onScheduleTask @ core.mjs:15284
scheduleTask @ zone.js:382
onScheduleTask @ zone.js:279
scheduleTask @ zone.js:382
scheduleTask @ zone.js:216
scheduleMicroTask @ zone.js:236
scheduleResolveOrReject @ zone.js:1247
then @ zone.js:1453
(anonymous) @ core.mjs:33057
_callAndReportToErrorHandler @ core.mjs:32082
(anonymous) @ core.mjs:33054
invoke @ zone.js:368
onInvoke @ core.mjs:15616
invoke @ zone.js:367
run @ zone.js:129
run @ core.mjs:15467
bootstrapModuleFactory @ core.mjs:33033
(anonymous) @ core.mjs:33086
invoke @ zone.js:368
run @ zone.js:129
(anonymous) @ zone.js:1257
invokeTask @ zone.js:402
runTask @ zone.js:173
drainMicroTaskQueue @ zone.js:581
Promise.then (async)
nativeScheduleMicroTask @ zone.js:557
scheduleMicroTask @ zone.js:568
scheduleTask @ zone.js:392
scheduleTask @ zone.js:216
scheduleMicroTask @ zone.js:236
scheduleResolveOrReject @ zone.js:1247
then @ zone.js:1453
bootstrapModule @ core.mjs:33086
(anonymous) @ main.ts:10
Show 291 more frames
Show less
nav.component.ts:27 
        
        
       POST http://127.0.0.1:8000/api/userlogout 500 (Internal Server Error)
scheduleTask @ zone.js:2677
scheduleTask @ zone.js:389
onScheduleTask @ core.mjs:15285
scheduleTask @ zone.js:382
onScheduleTask @ zone.js:279
scheduleTask @ zone.js:382
scheduleTask @ zone.js:216
scheduleMacroTask @ zone.js:239
scheduleMacroTaskWithCurrentZone @ zone.js:672
(anonymous) @ zone.js:2710
proto.<computed> @ zone.js:962
(anonymous) @ http.mjs:2374
Observable2._trySubscribe @ Observable.js:38
(anonymous) @ Observable.js:32
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ switchMap.js:14
OperatorSubscriber2._this._next @ OperatorSubscriber.js:15
Subscriber2.next @ Subscriber.js:34
(anonymous) @ innerFrom.js:51
Observable2._trySubscribe @ Observable.js:38
(anonymous) @ Observable.js:32
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ switchMap.js:10
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ finalize.js:5
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ finalize.js:5
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
doInnerSub @ mergeInternals.js:19
outerNext @ mergeInternals.js:14
OperatorSubscriber2._this._next @ OperatorSubscriber.js:15
Subscriber2.next @ Subscriber.js:34
(anonymous) @ innerFrom.js:51
Observable2._trySubscribe @ Observable.js:38
(anonymous) @ Observable.js:32
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
mergeInternals @ mergeInternals.js:53
(anonymous) @ mergeMap.js:14
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ filter.js:6
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ map.js:6
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
logout @ nav.component.ts:27
NavComponent_button_16_Template_button_click_0_listener @ nav.component.html:22
executeListenerWithErrorHandling @ core.mjs:26043
wrapListenerIn_markDirtyAndPreventDefault @ core.mjs:26076
(anonymous) @ platform-browser.mjs:749
invokeTask @ zone.js:402
(anonymous) @ core.mjs:15290
onInvokeTask @ core.mjs:15290
invokeTask @ zone.js:401
onInvokeTask @ core.mjs:15603
invokeTask @ zone.js:401
runTask @ zone.js:173
invokeTask @ zone.js:483
invokeTask @ zone.js:1642
globalCallback @ zone.js:1673
globalZoneAwareCallback @ zone.js:1706
Zone - HTMLButtonElement.addEventListener:click (async)
onScheduleTask @ core.mjs:15284
scheduleTask @ zone.js:382
onScheduleTask @ zone.js:279
scheduleTask @ zone.js:382
scheduleTask @ zone.js:216
scheduleEventTask @ zone.js:242
(anonymous) @ zone.js:1959
addEventListener @ platform-browser.mjs:850
addEventListener @ platform-browser.mjs:210
listen @ platform-browser.mjs:731
listenerInternal @ core.mjs:26000
ɵɵlistener @ core.mjs:25881
NavComponent_button_16_Template @ nav.component.html:22
executeTemplate @ core.mjs:10537
renderView @ core.mjs:11738
createAndRenderEmbeddedLView @ core.mjs:11806
createEmbeddedViewImpl @ core.mjs:12702
createEmbeddedView @ core.mjs:16911
_updateView @ common.mjs:3693
set ngIf @ common.mjs:3667
applyValueToInputField @ core.mjs:5805
writeToDirectiveInput @ core.mjs:10365
setInputsForProperty @ core.mjs:11660
elementPropertyInternal @ core.mjs:10961
ɵɵproperty @ core.mjs:21752
NavComponent_Template @ nav.component.html:22
executeTemplate @ core.mjs:10537
refreshView @ core.mjs:12100
detectChangesInView @ core.mjs:12324
detectChangesInViewIfAttached @ core.mjs:12287
detectChangesInComponent @ core.mjs:12276
detectChangesInChildComponents @ core.mjs:12337
refreshView @ core.mjs:12150
detectChangesInView @ core.mjs:12324
detectChangesInViewIfAttached @ core.mjs:12287
detectChangesInComponent @ core.mjs:12276
detectChangesInChildComponents @ core.mjs:12337
refreshView @ core.mjs:12150
detectChangesInView @ core.mjs:12324
detectChangesInViewWhileDirty @ core.mjs:12041
detectChangesInternal @ core.mjs:12023
detectChangesInView @ core.mjs:32385
detectChangesInAttachedViews @ core.mjs:32357
tick @ core.mjs:32329
(anonymous) @ core.mjs:32681
invoke @ zone.js:368
onInvoke @ core.mjs:15616
invoke @ zone.js:367
run @ zone.js:129
run @ core.mjs:15467
next @ core.mjs:32680
ConsumerObserver2.next @ Subscriber.js:96
Subscriber2._next @ Subscriber.js:63
Subscriber2.next @ Subscriber.js:34
(anonymous) @ Subject.js:41
errorContext @ errorContext.js:19
Subject2.next @ Subject.js:31
emit @ core.mjs:115
checkStable @ core.mjs:15535
onHasTask @ core.mjs:15633
hasTask @ zone.js:422
_updateTaskCount @ zone.js:443
_updateTaskCount @ zone.js:272
runTask @ zone.js:190
drainMicroTaskQueue @ zone.js:581
invokeTask @ zone.js:487
invokeTask @ zone.js:1642
globalCallback @ zone.js:1685
globalZoneAwareCallback @ zone.js:1706
load (async)
customScheduleGlobal @ zone.js:1790
scheduleTask @ zone.js:389
onScheduleTask @ core.mjs:15285
scheduleTask @ zone.js:382
onScheduleTask @ zone.js:279
scheduleTask @ zone.js:382
scheduleTask @ zone.js:216
scheduleEventTask @ zone.js:242
(anonymous) @ zone.js:1959
(anonymous) @ http.mjs:2360
Observable2._trySubscribe @ Observable.js:38
(anonymous) @ Observable.js:32
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ switchMap.js:14
OperatorSubscriber2._this._next @ OperatorSubscriber.js:15
Subscriber2.next @ Subscriber.js:34
(anonymous) @ innerFrom.js:51
Observable2._trySubscribe @ Observable.js:38
(anonymous) @ Observable.js:32
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ switchMap.js:10
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ finalize.js:5
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ finalize.js:5
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
doInnerSub @ mergeInternals.js:19
outerNext @ mergeInternals.js:14
OperatorSubscriber2._this._next @ OperatorSubscriber.js:15
Subscriber2.next @ Subscriber.js:34
(anonymous) @ innerFrom.js:51
Observable2._trySubscribe @ Observable.js:38
(anonymous) @ Observable.js:32
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
mergeInternals @ mergeInternals.js:53
(anonymous) @ mergeMap.js:14
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ filter.js:6
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ map.js:6
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
(anonymous) @ tap.js:15
(anonymous) @ lift.js:10
(anonymous) @ Observable.js:27
errorContext @ errorContext.js:19
Observable2.subscribe @ Observable.js:23
login @ login-modal.component.ts:20
LoginModalComponent_Template_button_click_12_listener @ login-modal.component.html:12
executeListenerWithErrorHandling @ core.mjs:26043
wrapListenerIn_markDirtyAndPreventDefault @ core.mjs:26076
(anonymous) @ platform-browser.mjs:749
invokeTask @ zone.js:402
(anonymous) @ core.mjs:15290
onInvokeTask @ core.mjs:15290
invokeTask @ zone.js:401
onInvokeTask @ core.mjs:15603
invokeTask @ zone.js:401
runTask @ zone.js:173
invokeTask @ zone.js:483
invokeTask @ zone.js:1642
globalCallback @ zone.js:1673
globalZoneAwareCallback @ zone.js:1706
Zone - HTMLButtonElement.addEventListener:click (async)
onScheduleTask @ core.mjs:15284
scheduleTask @ zone.js:382
onScheduleTask @ zone.js:279
scheduleTask @ zone.js:382
scheduleTask @ zone.js:216
scheduleEventTask @ zone.js:242
(anonymous) @ zone.js:1959
addEventListener @ platform-browser.mjs:850
addEventListener @ platform-browser.mjs:210
listen @ platform-browser.mjs:731
listenerInternal @ core.mjs:26000
ɵɵlistener @ core.mjs:25881
LoginModalComponent_Template @ login-modal.component.html:12
executeTemplate @ core.mjs:10537
renderView @ core.mjs:11738
renderComponent @ core.mjs:11685
renderChildComponents @ core.mjs:11786
renderView @ core.mjs:11766
create @ core.mjs:16583
createComponent @ core.mjs:35778
_createFromComponent @ ng-bootstrap.mjs:9896
_getContentRef @ ng-bootstrap.mjs:9867
open @ ng-bootstrap.mjs:9796
open @ ng-bootstrap.mjs:10003
openLoginModal @ nav.component.ts:23
NavComponent_button_15_Template_button_click_0_listener @ nav.component.html:21
executeListenerWithErrorHandling @ core.mjs:26043
wrapListenerIn_markDirtyAndPreventDefault @ core.mjs:26076
(anonymous) @ platform-browser.mjs:749
invokeTask @ zone.js:402
(anonymous) @ core.mjs:15290
onInvokeTask @ core.mjs:15290
invokeTask @ zone.js:401
onInvokeTask @ core.mjs:15603
invokeTask @ zone.js:401
runTask @ zone.js:173
invokeTask @ zone.js:483
invokeTask @ zone.js:1642
globalCallback @ zone.js:1673
globalZoneAwareCallback @ zone.js:1706
Zone - HTMLButtonElement.addEventListener:click (async)
onScheduleTask @ core.mjs:15284
scheduleTask @ zone.js:382
onScheduleTask @ zone.js:279
scheduleTask @ zone.js:382
scheduleTask @ zone.js:216
scheduleEventTask @ zone.js:242
(anonymous) @ zone.js:1959
addEventListener @ platform-browser.mjs:850
addEventListener @ platform-browser.mjs:210
listen @ platform-browser.mjs:731
listenerInternal @ core.mjs:26000
ɵɵlistener @ core.mjs:25881
NavComponent_button_15_Template @ nav.component.html:21
executeTemplate @ core.mjs:10537
renderView @ core.mjs:11738
createAndRenderEmbeddedLView @ core.mjs:11806
createEmbeddedViewImpl @ core.mjs:12702
createEmbeddedView @ core.mjs:16911
_updateView @ common.mjs:3693
set ngIf @ common.mjs:3667
applyValueToInputField @ core.mjs:5805
writeToDirectiveInput @ core.mjs:10365
setInputsForProperty @ core.mjs:11660
elementPropertyInternal @ core.mjs:10961
ɵɵproperty @ core.mjs:21752
NavComponent_Template @ nav.component.html:21
executeTemplate @ core.mjs:10537
refreshView @ core.mjs:12100
detectChangesInView @ core.mjs:12324
detectChangesInViewIfAttached @ core.mjs:12287
detectChangesInComponent @ core.mjs:12276
detectChangesInChildComponents @ core.mjs:12337
refreshView @ core.mjs:12150
detectChangesInView @ core.mjs:12324
detectChangesInViewIfAttached @ core.mjs:12287
detectChangesInComponent @ core.mjs:12276
detectChangesInChildComponents @ core.mjs:12337
refreshView @ core.mjs:12150
detectChangesInView @ core.mjs:12324
detectChangesInViewWhileDirty @ core.mjs:12041
detectChangesInternal @ core.mjs:12023
detectChangesInView @ core.mjs:32385
detectChangesInAttachedViews @ core.mjs:32357
tick @ core.mjs:32329
_loadComponent @ core.mjs:32409
bootstrap @ core.mjs:32305
(anonymous) @ core.mjs:33091
_moduleDoBootstrap @ core.mjs:33091
(anonymous) @ core.mjs:33061
invoke @ zone.js:368
onInvoke @ core.mjs:15616
invoke @ zone.js:367
run @ zone.js:129
(anonymous) @ zone.js:1257
invokeTask @ zone.js:402
(anonymous) @ core.mjs:15290
onInvokeTask @ core.mjs:15290
invokeTask @ zone.js:401
onInvokeTask @ core.mjs:15603
invokeTask @ zone.js:401
runTask @ zone.js:173
drainMicroTaskQueue @ zone.js:581
Zone - Promise.then (async)
onScheduleTask @ core.mjs:15284
scheduleTask @ zone.js:382
onScheduleTask @ zone.js:279
scheduleTask @ zone.js:382
scheduleTask @ zone.js:216
scheduleMicroTask @ zone.js:236
scheduleResolveOrReject @ zone.js:1247
then @ zone.js:1453
(anonymous) @ core.mjs:33057
_callAndReportToErrorHandler @ core.mjs:32082
(anonymous) @ core.mjs:33054
invoke @ zone.js:368
onInvoke @ core.mjs:15616
invoke @ zone.js:367
run @ zone.js:129
run @ core.mjs:15467
bootstrapModuleFactory @ core.mjs:33033
(anonymous) @ core.mjs:33086
invoke @ zone.js:368
run @ zone.js:129
(anonymous) @ zone.js:1257
invokeTask @ zone.js:402
runTask @ zone.js:173
drainMicroTaskQueue @ zone.js:581
Promise.then (async)
nativeScheduleMicroTask @ zone.js:557
scheduleMicroTask @ zone.js:568
scheduleTask @ zone.js:392
scheduleTask @ zone.js:216
scheduleMicroTask @ zone.js:236
scheduleResolveOrReject @ zone.js:1247
then @ zone.js:1453
bootstrapModule @ core.mjs:33086
(anonymous) @ main.ts:10
Show 355 more frames
Show less
nav.component.ts:34 Logout failed HttpErrorResponse {headers: _HttpHeaders, status: 500, statusText: 'Internal Server Error', url: 'http://127.0.0.1:8000/api/userlogout', ok: false, …}