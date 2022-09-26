import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'answer-question',
    loadChildren: () => import('./answer-question/answer-question.module').then( m => m.AnswerQuestionPageModule)
  },
  {
    path: 'sign-in-up',
    loadChildren: () => import('./sign-in-up/sign-in-up.module').then( m => m.SignInUpPageModule)
  },
  {
    path: 'new-game',
    loadChildren: () => import('./new-game/new-game.module').then( m => m.NewGamePageModule)
  },
  {
    path: 'ranking-player',
    loadChildren: () => import('./ranking-player/ranking-player.module').then( m => m.RankingPlayerPageModule)
  },
  {
    path: 'ranking-games',
    loadChildren: () => import('./ranking-games/ranking-games.module').then( m => m.RankingGamesPageModule)
  },
  {
    path: 'ranking-game-by-configuration',
    loadChildren: () => import('./ranking-game-by-configuration/ranking-game-by-configuration.module').then( m => m.RankingGameByConfigurationPageModule)
  },  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'recovery-password',
    loadChildren: () => import('./recovery-password/recovery-password.module').then( m => m.RecoveryPasswordPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
