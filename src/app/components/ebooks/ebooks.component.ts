import { Component, OnInit } from '@angular/core';
import { EbookService } from '../../services/ebook.service';
import { Ebook } from '../../common/ebook';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ebooks',
  imports: [
      CommonModule
  ],
  templateUrl: './ebooks.component.html',
  styleUrl: './ebooks.component.css'
})
export class EbooksComponent implements OnInit{

  ebooks!: Ebook[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;

  constructor(
    private ebookService: EbookService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listEbooks();
  }

  listEbooks() {

    this.ebookService.getEbooks().subscribe(
      data => {
        //console.log('Ebooks=' + JSON.stringify(data));
        this.ebooks = data;
      }
    )
  }  
}
