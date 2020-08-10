import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-india",
  templateUrl: "./india.component.html",
  styleUrls: ["./india.component.css"],
})
export class IndiaComponent implements OnInit {
  coronaList = [];
   
  constructor(private _auth: AuthService, private _route: Router) {}

  ngOnInit() {
    this._auth.getcoviddata().subscribe((data) => {
      this.coronaList = data;
      console.log(data);
    });
  }
  // getdistrictdata() {
  //   console.log("hi");
  //   console.log()
  //   this._route.navigate(["/state/:id"]);
  // }
}
