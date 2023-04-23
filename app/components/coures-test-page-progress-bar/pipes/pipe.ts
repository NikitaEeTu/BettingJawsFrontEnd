import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'progressBarProcent'

}) export class pxsuffix implements PipeTransform {

transform(input: number): string{
   return input.toFixed(2) + '%';
} }
