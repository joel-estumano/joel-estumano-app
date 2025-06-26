import { Component } from "@angular/core";
import { posts } from "../../constants";

@Component({
	selector: "app-list",
	standalone: false,
	templateUrl: "./list.component.html"
})
export class ListComponent {
	articles = posts;
}
