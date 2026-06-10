export interface IIssue {
  title:string,
  description:string,
  type:string,
  status?: string,
}


export interface IResponseIssue{
   id : string,
   title : string,
   description : string,
   type : string,
   status: string,
   reporter_id:{
     id:string,
     name:string,
     role:string,
   },
   created_at : Date,
   updated_at :Date
  }