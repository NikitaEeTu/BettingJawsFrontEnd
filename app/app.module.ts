import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestProgressbarComponent } from './components/coures-test-page-progress-bar/test.progressbar.components';
import { PlayerLevelProgressbarComponent } from './components/player-level-progressbar/player.level.progressbar.component';
import { CoursesTestPageQuestionsComponent } from './components/courses.test.page.questions/courses.test.page.questions.component';
import { CoursesTestPageResultsComponent } from './components/courses.test.page.results/courses.test.page.results.component';
import { FormsModule } from '@angular/forms';
import { CoursePageComponent } from './components/course.page/course.page.component';
import { CoursesPageComponent } from './components/courses.page/courses.page.component';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main.page/main.page.component';
import { SupportGroupPageComponent } from './components/support.group.page/support.group.page.component';
import { AskForHelpPageComponent } from './components/ask.for.help.page/ask.for.help.page.component';
import { BackToMainMenuComponent } from './components/back-to-main-menu/back.to.main.menu.component';
import { CalculateYourRiskComponent } from './components/calculate-your-risk/calculate.your.risk.component';
import { CountTimeGamblingComponent } from './count.time.gambling/count.time.gambling.component';
import { TossCoinSimulComponent } from './components/toss.coin.simul/toss.coin.simul.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackBtnComponent } from './components/back.btn/back.btn.component';
import { SearchCityElemComponent } from './components/search.city.elem/search.city.elem.component';
import { PlayerLevelRepresintationComponent } from './components/player.level.represintation/player.level.represintation.component';
import { FactsWheelComponent } from './components/facts.wheel/facts.wheel.component';
import { NgxWheelModule } from 'ngx-wheel';
import { LoginPageComponent } from './components/login.page/login.page.component';
import { RegisterPageComponent } from './components/register.page/register.page.component';
import { UserLevelProfileComponent } from './components/user-level-profile/user-level-profile.component';
import { VideosComponent } from './components/videos/videos.component';

const appRoutes: Routes = [
  {path: "", component: MainPageComponent},
  {path: "courses", component: CoursesPageComponent},
  {path: "support-groups", component: SupportGroupPageComponent},
  {path: "ask-for-help", component: AskForHelpPageComponent},
  {path: "course/check-gambling-addiction", component: CoursePageComponent},
  {path: "course/calculate-risk", component: CalculateYourRiskComponent},
  {path: "course/time-to-gambling", component: CountTimeGamblingComponent},
  {path: "course/toss-a-coin", component: TossCoinSimulComponent},
  {path: "course/facts-wheel", component: FactsWheelComponent},
  {path: "login", component: LoginPageComponent},
  {path: "register", component: RegisterPageComponent},
  {path: "course/videos", component: VideosComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    TestProgressbarComponent,
    PlayerLevelProgressbarComponent,
    CoursesTestPageQuestionsComponent,
    CoursesTestPageResultsComponent,
    CoursePageComponent,
    CoursesPageComponent,
    MainPageComponent,
    SupportGroupPageComponent,
    AskForHelpPageComponent,
    BackToMainMenuComponent,
    CalculateYourRiskComponent,
    CountTimeGamblingComponent,
    TossCoinSimulComponent,
    BackBtnComponent,
    SearchCityElemComponent,
    PlayerLevelRepresintationComponent,
    FactsWheelComponent,
    LoginPageComponent,
    RegisterPageComponent,
    UserLevelProfileComponent,
    VideosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgChartsModule,
    HttpClientModule,
    NgxWheelModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
