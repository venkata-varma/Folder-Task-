const obj={
sno:1,
    yourrt:{
name: "Venkat",
age: 23,
place: "Hyderabad"

},
m:3
}
const requ=Object.entries(obj)
const firstel=requ.find(ar=> ar[0]==='yourrt')
console.log(firstel)
