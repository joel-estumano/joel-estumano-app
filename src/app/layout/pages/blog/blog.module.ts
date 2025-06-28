import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { AvatarComponent } from '@components/ui/avatar/avatar.component';
import { BlogService } from './service/blog.service';
import { ButtonComponent } from '@components/ui/button/button.component';
import { IconComponent } from '@components/icon/icon.component';
import { ListComponent } from './pages/list/list.component';
import { NgModule } from '@angular/core';
import { ReadComponent } from './pages/read/read.component';
import { RouterLinkComponent } from '@components/ui/router-link/router-link.component';
import { RouterModule, Routes } from '@angular/router';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html/safe-html.pipe';
import { SectionComponent } from '@components/section/section.component';
import { postExistGuard } from './guards/post-exist.guard';

const routes: Routes = [
	{ path: '', component: ListComponent },
	{ path: ':id', component: ReadComponent, canActivate: [postExistGuard] }
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
		AvatarComponent
	],
	providers: [BlogService]
})
export class BlogModule {}
