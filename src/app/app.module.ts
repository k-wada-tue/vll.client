import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainDashboardComponent,
         UploadComponent,
         RegisterComponent,
         ProfileComponent,
         LoginComponent,
         ErrorComponent,
         VisComponent,
         FooterComponent,
         HeaderComponent,
         CardComponent,
         DatalistitemComponent,
         OneComponent,
         TwoComponent,
         TermsComponent,
         ProfilePictureEditorComponent,
         NavComponent
} from './_components';

import { MongodbService } from './_services/mongodb.service';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainDashboardComponent,
    ErrorComponent,
    LoginComponent,
    ProfileComponent,
    CardComponent,
    UploadComponent,
    RegisterComponent,
    VisComponent,
    DatalistitemComponent,
    OneComponent,
    TwoComponent,
    TermsComponent,
    NavComponent,
    ProfilePictureEditorComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    HttpClient,
    MongodbService,
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule {
  public static toastr: ToastrService;
  constructor(private toastrService: ToastrService) {
    AppModule.toastr = toastrService;
  }
}
