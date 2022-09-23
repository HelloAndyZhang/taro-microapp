export  function printLog ( tag ='', module='PaoTui' ,) {
  const Color = {
    "PaoTui":'#FF710F',
    "JiaZheng":'#00C957',
    "Root":'#A020F0'
  }
  console.log(
    `%c [UUPT] %c ${module} %c ${JSON.stringify(tag)} %c`,
    "background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
    `background:${Color[module]} ; padding: 1px; border-radius: 0px 0 0 0px;  color: #fff`,
    "background:#E3170D ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff",
    "background:transparent"
  );
}
