
var input = document.getElementById('input');
var number = document.querySelectorAll('.numbers div'); //recebe todos os números + operadores "." e "C
var operator = document.querySelectorAll('#operators div') // recebe todos os operadores aritiméticos
var clear = document.getElementById('clear')
var result = document.getElementById('equal')
var result_displayed = false // flag pra mostrar se o resultado da atual operação está sendo mostrada
 
//adiciona a interação com cliques aos números 
for(var cont=0; cont<number.length; cont++) {

    number[cont].addEventListener('click', function(e){

        //guardando as variaveis dentro do input/ e o ultimo char da string
        var current_string = input.innerHTML
        var last_char = current_string[current_string.length - 1]
                
        //Se o resultado não está sendo mostrado, continue adicionando ao input
        if (result_displayed == false ) {
            input.innerHTML += e.target.innerHTML
        } else if (result_displayed==true&&last_char=='+'||last_char=='-'||last_char=='×'|| last_char=='÷') {
            //Se o input está mostrando o resultado e o usuário continua com
            //adicionando operadoresm, precisamos continuar adicionando elementos
            //a string para a próxima operação
            result_displayed = false;
            input.innerHTML += e.target.innerHTML
        }else {
            //Esse else irá cair toda vez que o resultado estiver sendo mostrado e 
            //o usuário clicar em outro número.
            //Agora eu preciso limpar o input e iniciar uma nova operação
            input.innerHTML = '';
            input.innerHTML += e.target.innerHTML
            result_displayed = false
         } 
    })
}

//adiciona a interação com cliques aos operadores
for(var cont=0; cont<operator.length;cont++){

    operator[cont].addEventListener('click', function(e){

        //guardadndo as variaveis do input e o ultimo char inserido
        var current_string = input.innerHTML 
        var last_char = current_string[current_string.length - 1]

        if(last_char=='+'||last_char=='-'||last_char=='×'||last_char=='÷'){
            //se o ultimo char for um operador, substituir pelo novo operador clicado
            var new_string = current_string.substring(0, current_string.length-1) + e.target.innerHTML
            input.innerHTML = new_string
        } else if(current_string.length == 0){
            //se não houver nada na string, não fazer nada
        } else {
            //passadas essas condições, só adicione o operador ao input
            input.innerHTML += e.target.innerHTML
        }

    })

}

//ao clicar em '=' resolveremos a conta
result.addEventListener('click', function(){
     
    //guardamos a conta requisitada
    var input_string = input.innerHTML
    //formamos uma array somente com os números da conta, retirando os operadores
    var numbers = input_string.split(/\+|\-|\×|\÷/g);
    //formamos uma array com os operadores 
    var operators = input_string.replace(/[0-9]|\./g, "").split("")

    console.log(input_string)        
    console.log("numeros: "+ numbers)
    console.log("operadores: " + operators)

    // agora faremos loops pela string resolvendo uma operação de cada vez 
    // 1º dividimos, depois multiplicamos, subtraimos e adicionamos 
    // ao passo em que se move pela string, alterando as arrays dos números e operadores 
    // o ultimo elemento da array será o resultado

    var divide = operators.indexOf('÷')
    while (divide != -1){
        numbers.splice(divide,2, numbers[divide] / numbers[divide+1])
        operators.splice(divide,1)
        divide = operators.indexOf('÷')
    }


    var multiply = operators.indexOf('×')
    while (multiply != -1){
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply+1])
        operators.splice(multiply,1)
        multiply = operators.indexOf('×')
    }

    var subtract = operators.indexOf("-")
    while (subtract != -1){
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract+1])
        operators.splice(subtract,1)
        subtract = operators.indexOf('-')
    }

    var add = operators.indexOf("+")
    while (add != -1){
        // O parseFloat é necessário para que não haja concatenação de string com "+"
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add+1]))
        operators.splice(add,1)
        add = operators.indexOf('+')
    }

    input.innerHTML = numbers[0] // mostra o resultado
    result_displayed = true // muda a flag para q o programa saiba q o resultado está sendo mostrado

 })

 clear.addEventListener('click', function(e){
     input.innerHTML = ""
 })