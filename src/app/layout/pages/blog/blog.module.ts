import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { AvatarComponent } from '@shared/ui/avatar/avatar.component';
import { BlogService } from './service/blog.service';
import { ButtonComponent } from '@shared/ui/button/button.component';
import { IconComponent } from '@shared/components/icon/icon.component';
import { ListComponent } from './pages/list/list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { NgModule } from '@angular/core';
import { ReadComponent } from './pages/read/read.component';
import { RouterLinkComponent } from '@shared/ui/router-link/router-link.component';
import { RouterModule, Routes } from '@angular/router';
import { SafeHtmlPipe } from '@shared/pipes/safe-html/safe-html.pipe';
import { SectionComponent } from '../../components/section/section.component';

const routes: Routes = [
	{ path: '', component: ListComponent },
	{ path: ':id', component: ReadComponent }
];

@NgModule({
	declarations: [ListComponent, ReadComponent],
	imports: [
		RouterModule.forChild(routes),
		NgClass,
		AsyncPipe,
		SafeHtmlPipe,
		SectionComponent,
		ButtonComponent,
		IconComponent,
		DatePipe,
		RouterLinkComponent,
		AvatarComponent,
		LoaderComponent
	],
	providers: [BlogService]
})
export class BlogModule {}
