// src/trening/dto/ustvari-trening.dto.ts
export class UstvariTreningDto {
  datum: Date;
  trajanje: number;
  vajaIDs: number[];
  opomba?: string;
}