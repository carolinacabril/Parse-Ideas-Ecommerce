let cardList = document.querySelector("#cardList")
let btnApply = document.querySelector("#apply-1")
let btnRemove = document.querySelector("#remove-1")
let frmSearch = document.querySelector("#searchBlock")
let lblPageTitle = document.querySelector("#pageTitle")

let cmbType = document.getElementById('type')
let edtKeyword = document.querySelector("#keyword")
let edtSaleValue1 = document.querySelector("#saleValue-1")
let edtSaleValue2 = document.querySelector("#saleValue-2")
let edtMonthlyAmount1 = document.querySelector("#monthlyAmount-1")
let edtMonthlyAmount2 = document.querySelector("#monthlyAmount-2")

let announces

let id_category = new URLSearchParams(window.location.search)
    .get("id_category");

btnRemove.addEventListener('click', function(e){
  e.preventDefault()
  clearForm()
});
window.addEventListener('load', bringData({id_category}));
edtSaleValue1.addEventListener('keyup', function(){
  numberValidate(this)
});
edtSaleValue2.addEventListener('keyup', function(){
  numberValidate(this)
});
edtMonthlyAmount1.addEventListener('keyup', function(){
  numberValidate(this)
});
edtMonthlyAmount2.addEventListener('keyup', function(){
  numberValidate(this)
})

frmSearch.addEventListener('submit', function(e){
  e.preventDefault()

  id_category = cmbType.selectedIndex

  bringData( {
    id_category: id_category,
    descricao: edtKeyword.value.trim(),
    preco1: edtSaleValue1.value,
    preco2: edtSaleValue2.value,
    faturamento_mm1: edtMonthlyAmount1.value,
    faturamento_mm2: edtMonthlyAmount2.value
  })
})

function clearForm() {
  cmbType.selectedIndex = 0
  edtKeyword.value = ''
  edtSaleValue1.value = ''
  edtSaleValue2.value = ''
  edtMonthlyAmount1.value = ''
  edtMonthlyAmount2.value = ''
}

function numberValidate(num) {
  let er = /[^0-9.,]/;
  er.lastIndex = 0;
  let field = num
  if (er.test(field.value)) {
    field.value='';
  }
}

function buildCards(data, totalRows) {
  let announces = data;

  lblPageTitle.innerHTML = `<strong>${cmbType.item(id_category).innerText}  à Venda</strong>`

  cardList.innerHTML = ''

  for(let i = 0; i < totalRows/2; i++) {
    cardList.innerHTML += `<div class="row"></div>`
  }

  let rows = document.querySelectorAll("#cardList .row")

  for(let j = 0; j < rows.length; j++){
    for(let i = 0; i < totalRows; i++) {
      if(i == 2) {
        break
      } else {
        rows[j].innerHTML += `
        <div class="col-md-6 col-sm-12 my-4">
          <div class="card">
              <img src="/images/img/carlos-muza-hpjSkU2UYSU-unsplash.jpg" class="card-img-top" alt="...">
              ${announces[i+(j*2)].prioridade ? `<span class="spotlight p-2">Destaque</span>` : ''}
              <span class="categorie tag-${announces[i+(j*2)].categoria_id} p-2">${announces[i+(j*2)].categoria.nome}</span>
              <div class="card-body">
                  <h5 class="card-title">${announces[i+(j*2)].descricao}</h5>
                  <p class="card-text">R$ ${announces[i+(j*2)].preco}</p>
                  <a href="/announcements/detail/${announces[i+(j*2)].id_anuncio}" class="btn btn-primary">+ Detalhes</a>
              </div>
          </div>
        </div>
        `
      }
    }
  }
}

function bringData(params) {
  fetch(window.location.origin+'/announcements/search', {
    method:'POST',
    body:JSON.stringify(params),
    headers: {'Content-Type':'application/json'}
  }).then(resp => {
    return resp.json()
  }).then(data => {
     buildCards(data, data.length)
     announces = data
  })
}