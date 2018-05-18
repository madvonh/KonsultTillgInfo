'use strict'

class consultsspreadsheet { 
  constructor(name, customer, start, end, extent, expertiees, change) {
    this.name= name, 
    this.customer = customer, 
    this.start =start, 
    this.end = end, 
    this.extent =extent, 
    this.expertiees = expertiees,
    this.change = change
    this.timeleft =1000;
  }
  static Sort(consults){
    var sorted = [];
    var temp;
    while (consults.length>0)
    {
      temp =consults[consults.length-1];

      /*om det inte finns någon tidsangivelse ska inte consulten med i listan*/
      if (temp.getTimeLeft()==null) {
        consults.pop();
        continue;
      }
      
      //jämför med alla och lägg sedan den med lägst värde i den sorterade listan
      var position = consults.length-1;
      var count = 0;
      consults.forEach(element => {
        if (element.getTimeLeft()!=null && temp.getTimeLeft()>element.getTimeLeft())
        {
          temp = element;
          position = count;
        }
        count ++;
      });

      sorted.push(temp);
      if (position != consults.length-1){
        consults[position] = consults[consults.length-1]
      }
      consults.pop();
    }
    return sorted;
  }

   getTimeLeft() {

    if (this.timeleft!=1000)
    {
      return this.timeleft;
    }

    let date;
    let end = this.end;
    let start = this.start;
    let today = new Date();
    var diffDays;
    var timeDiff;
    if ((end==undefined ||end.isNullOrUndefined || end=="") && (start== undefined || start.isNullOrUndefined ||start==""))
    {
      this.timeleft=null;
      return null;
    }
    else if (end!=undefined &&!end.isNullOrUndefined && end!="")
    {
      date = new Date(end);
    }
    else 
    {
        date = new Date(start);
    }
    timeDiff = Math.abs(date.getTime() -today.getTime());
    if (date<=today)
    {
      diffDays= -Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    else
    {
      diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    }
    this.timeleft = diffDays;
    return diffDays;
  } 
}

module.exports = consultsspreadsheet;