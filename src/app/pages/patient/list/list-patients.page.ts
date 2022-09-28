import { Component } from '@angular/core';

export interface Patient {
  id: string;
  name: string;
  telephone: string;
  sex: string;
  age: number;
  kcal: number;
  height: number;
  weight: number;
  imgUrl: string;
}

/* eslint-disable max-len */
export const mockedPatients: Array<Patient> = [
  { id: '0', name: 'Renato Lopes', telephone: '(63) 2166-7169', sex: 'Masculino', age: 24, kcal: 2000, height: 1.80, weight: 68.40, imgUrl: 'https://images.generated.photos/L0DKS46xWc-U6HfWBtuJBQJrggDGQk5pacJFleli0h8/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzcwMDcxLmpwZw.jpg' },
  { id: '1', name: 'Marcela Silva', telephone: '(86) 3433-9392', sex: 'Feminino', age: 15, kcal: 2500, height: 1.56, weight: 54.48, imgUrl: 'https://images.generated.photos/qFFNt8622A9UInzX8OcQ1dqQrMJNJxdvyOaH2woRmHs/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDI4MzM1LmpwZw.jpg' },
  { id: '2', name: 'Gabriela Pereira', telephone: '(91) 3717-7654', sex: 'Feminino', age: 22, kcal: 1800, height: 1.72, weight: 75.80, imgUrl: 'https://images.generated.photos/M3xqPPeXm_m2UPK_WJVJdc4EH6aXvz-6ffYG11bUObk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MjI3MjM1LmpwZw.jpg' },
  { id: '3', name: 'Sandra Pires', telephone: '(64) 3187-9421', sex: 'Feminino', age: 38, kcal: 2400, height: 1.64, weight: 69.32, imgUrl: 'https://images.generated.photos/0DUOKVlZhT9k76Jv9Wi_A6Es3kBn7sFYTW0uslxnXVg/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzM3MzM2LmpwZw.jpg' },
  { id: '4', name: 'Augusto Alves', telephone: '(95) 3157-5273', sex: 'Masculino', age: 52, kcal: 3000, height: 1.87, weight: 85.67, imgUrl: 'https://images.generated.photos/vPU59jJoM99uU4Xg8UiJnov5OoQCh7FHlZv-ocn16x4/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDk3OTY2LmpwZw.jpg' },
  { id: '5', name: 'Pedro Paulo', telephone: '(64) 3339-0973', sex: 'Masculino', age: 18, kcal: 2400, height: 1.70, weight: 70.34, imgUrl: 'https://images.generated.photos/ZEgu7oOIH5iSjqOh5q2QpHBnRcgjD2GVuf2iVSGX-6U/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDEzMzQwLmpwZw.jpg' },
];

@Component({
  selector: 'app-list-patients',
  templateUrl: 'list-patients.page.html',
  styleUrls: ['list-patients.page.scss']
})

export class ListPatientsPage {

  public patients: Array<Patient> = mockedPatients;

  constructor() {}

}
