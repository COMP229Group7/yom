export class Survey
{
  constructor(
    
    public questions?: string,
    public active?: boolean,
    public isPublic?: boolean,
    public userId?: string,
    public startDate?: Date,
    public endDate?: Date,
    public title?: string,
    public description?: String,
    public template?: string,
   
  ){}
}
