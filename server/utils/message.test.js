var expect=require('expect');
const {generateMessage,generateLocationMessage}=require('./message');

describe('test',()=>
{

  it('should varify our data',()=>{

        var from='shubham';
         var text='hi i m node developer';
         var res=generateMessage(from,text);

         expect(res.createdAt).toBeA('number');
         expect(res).toInclude({from,text});
  });
});

describe('testlocation',()=>{

    it('should generate correct loction',()=>{

        var from='shubham';
      var latitude=12;
      var longitude=13;
      var url=`https://www.google.com/maps?q=12,13`;

      var res1=generateLocationMessage(from,latitude,longitude);

       expect(res1.createdAt).toBeA('number');
       expect(res1).toInclude({from,url});
});
    });
