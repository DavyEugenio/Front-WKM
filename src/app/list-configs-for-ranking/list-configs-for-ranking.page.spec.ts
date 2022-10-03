import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListConfigsForRankingPage } from './list-configs-for-ranking.page';

describe('ListConfigsForRankingPage', () => {
  let component: ListConfigsForRankingPage;
  let fixture: ComponentFixture<ListConfigsForRankingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConfigsForRankingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListConfigsForRankingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
