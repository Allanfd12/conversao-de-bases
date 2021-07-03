var digitos = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "A": 10,
    "B": 11,
    "C": 12,
    "D": 13,
    "E": 14,
    "F": 15,
    "G": 16,
    "H": 17,
    "I": 18,
    "J": 19,
    "K": 20,
    "L": 21,
    "M": 22,
    "N": 23,
    "O": 24,
    "P": 25,
    "Q": 26,
    "R": 27,
    "S": 28,
    "T": 29,
    "U": 30,
    "V": 31,
    "W": 32,
    "X": 33,
    "Y": 34,
    "Z": 35,
    "a": 36,
    "b": 37,
    "c": 38,
    "d": 39,
    "e": 40,
    "f": 41,
    "g": 42,
    "h": 43,
    "i": 44,
    "j": 45,
    "k": 46,
    "l": 47,
    "m": 48,
    "n": 49,
    "o": 50,
    "p": 51,
    "q": 52,
    "r": 53,
    "s": 54,
    "t": 55,
    "u": 56,
    "v": 57,
    "w": 58,
    "x": 59,
    "y": 60,
    "z": 61,
    "+": 62,
    "/": 63
};
var caracteres = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "+", "/"];
$("#numeroBaseX").mask("Z", {
    translation: {
        'Z': {
            pattern: /[a-zA-Z0-9+/-]/,
            recursive: true
        }
    }
});

$("#numeroBaseX").keyup(function() {
    calculaConversaoBxB10();
});
$("#numeroBaseX").change(function() {
    calculaConversaoBxB10();
});
$("#baseX").keyup(function() {
    calculaConversaoBxB10();
});
$("#baseX").change(function() {
    calculaConversaoBxB10();
});
$("#numero").keyup(function() {
    calculaConversaoB10Bx();
});
$("#numero").change(function() {
    calculaConversaoB10Bx();
});
$("#base").keyup(function() {
    calculaConversaoB10Bx();
});
$("#base").change(function() {
    calculaConversaoB10Bx();
});

function calculaConversaoB10Bx(nb10 = null, bx = null, calcularProxima = true) {
    let base;
    let nBase10;

    if (nb10 == null) {
        nBase10 = $("#numero").val();
    } else {
        $("#numero").val(nb10);
        nBase10 = nb10;
    }
    if (bx == null) {
        base = $("#base").val();
    } else {
        $("#base").val(bx);
        base = bx;
    }

    let resultado = "";
    let espaco = "";
    let loop = true;
    let sinal = "";
    $("#resposta").html('');
    let digito = "0";
    if (nBase10 < 0) {
        nBase10 = -nBase10;
        sinal = "-";
    }
    if (nBase10 == 0) {
        nBase10 = 0;
        $("#resposta").append(espaco + " " + nBase10 + " |<span class='u'>" + base + " </span>\n");
        $("#resposta").append(espaco + " <span class='d'>" + digito + "</span>  " + nBase10 + "\n");
        resultado = "0";
    }
    while (nBase10 > 0 && base >= 2 && base <= 64) {

        digito = caracteres[nBase10 % base];
        resultado += digito;
        $("#resposta").append(espaco + sinal + nBase10 + "|<span class='u'>" + base + " </span>\n");
        nBase10 = (nBase10 - nBase10 % base) / base;
        $("#resposta").append(espaco + "<span class='d'>" + digito + "</span>  " + sinal + nBase10 + "\n");
        espaco += "   ";
    }


    $("#resposta").append("<br>" + resultado + "<br><br>");
    $("#resposta").append("Base" + base + ": <span class='d'>" + sinal + resultado.split("").reverse().join("") + "<sub>" + base + "</sub><span><br>");
    if (calcularProxima) {
        calculaConversaoBxB10(sinal + resultado.split("").reverse().join(""), base, false);
    }
    return sinal + resultado.split("").reverse().join("");
}

function calculaConversaoBxB10(nbx = null, bx = null, calcularProxima = true) {

    if (nbx == null) {
        nbx = $("#numeroBaseX").val();
    } else {
        $("#numeroBaseX").val(nbx);
    }
    if (bx == null) {
        bx = $("#baseX").val();
    } else {
        $("#baseX").val(bx);
    }
    $("#resposta2").html('Número: ' + nbx + "<sub>" + bx + "</sub><br><br>");
    nbx = nbx.toString().split("").reverse();
    let resultado = 0;
    let subRes = 0;
    let sinal = 1;
    if (nbx[nbx.length - 1] == "-") {
        nbx.splice(nbx.length - 1, 1);
        sinal *= -1;
    }
    let maiorCaracter = 0;
    for (let j = 0; j < nbx.length; j++) {
        if (digitos[nbx[j]] > maiorCaracter) {
            maiorCaracter = digitos[nbx[j]];
        }
    }
    if (maiorCaracter >= bx) {
        $("#baseX").val(maiorCaracter + 1);
        $("#resposta2").html('');
        bx = maiorCaracter + 1;
    }
    for (let i = 0; i < nbx.length; i++) {
        subRes = digitos[nbx[i]] * Math.pow(bx, i);
        $("#resposta2").append("<span class='d'>" + nbx[i] + "</span> * " + bx + "<sup><span class='d'>" + i + " </span></sup>= " + subRes + " \n");
        resultado += subRes;
    }
    $("#resposta2").append("\ntotal: <span class='d'>" + sinal * resultado + "<sub>10</sub></span> \n");
    if (calcularProxima) {
        calculaConversaoB10Bx(sinal * resultado, bx, false);
    }
    return sinal * resultado;
}

function print_bxby(nbx, bx, by) {
    return calculaConversaoB10Bx(calculaConversaoBxB10(nbx, bx, false), by, false) // escreve na tela
}

// nbx = numero na base x
// recebe um numero em uma base especifica
// bx = base x
// recebe a base ao qual o numero esta codificiado
function bxb10(nbx, bx) {
    // uma função é um grupo de codigo que pode ser chamado por um no nome
    // usa-se bxb10("123F", 16); para chamar a função

    if (bx < 2 || bx > 64) // verifica se o valor de base é suportado
        return;

    nbx = nbx.toString().split("").reverse();
    // .toString() transforma nbx em texto
    // .split("") separa todos os caracteres em um vetor "abc" => ['a','b','c'] => nbx[0] = 'a'
    // .reverse() inverte o vetor ['a','b','c'] => ['c','b','a'] 
    let sinal = 1; // guarda o sinal
    let resultado = 0; // guarda o resultado
    if (nbx[nbx.length - 1] == "-") { // nbx é um vetro, nbx.length retorna o numero de elementos, logo nbx[nbx.length - 1] retorna o ultimo elemento
        nbx.splice(nbx.length - 1, 1); // remove o ultimo elemento
        sinal *= -1; // inverte o sinal
    }
    for (let i = 0; i < nbx.length; i++) { // escaneia todas as posições
        resultado += digitos[nbx[i]] * Math.pow(bx, i); // digitos contrem a relção 'a' = 36
        // resultado recebe resultado + valor do caractere * base de destino elevado a posição no vetor
    }
    return sinal * resultado; // retorna resultado com sinal
}
// nb10 = numero na base 10
// recebe um numero na base 10
// bx = base x
// recebe a base ao qual o numero devera ser codificiado
function b10bx(nb10, bx) {

    if (bx < 2 || bx > 64) // verifica se o valor de base é suportado
        return;

    let resultado = ""; // resultado é um texto
    let sinal = ""; // sinal é um texto

    if (nb10 == 0) // caso entrada 0, retorna 0; conta não funciona corretamente com 0
        return 0;

    if (nb10 < 0) { // caso nb10 <0, retorna nb10 positiva e salva o sinal
        sinal = "-";
        nb10 *= -1;
    }


    while (nb10 > 0) { // enquanto nb10 > 0
        resultado += caracteres[nb10 % bx]; // não interprete isto como uma soma, esta sendo feita uma junção de caracteres
        //ex: "10" + "2" => "102"
        // nb10 % bx obtem o resto da divisão, e caracteres[nb10 % bx] retorna o caractere correspondente
        nb10 = (nb10 - nb10 % bx) / bx; // realzia a divisão euclidiana (javascript não possui div)
    }
    return sinal + resultado.split("").reverse().join(""); // junta o sinal ao numero
    // .split("") separa todos os caracteres em um vetor "cba" => ['c','b','a']
    // .reverse() inverte os caracteres neste vetor ['c','b','a'] => ['a','b','c']
    // .join("") junta todo o caracteres neste vetor ['a','b','c'] => "abc"
}


// nbx = numero na base x
// recebe um numero em uma base especifica
// bx = base x
// recebe a base ao qual o numero esta codificiado
// by = base y
// recebe a base ao qual o numero devera ser codificiado
function bxby(nbx, bx, by) { // coverte da base x para a base y
    // bxb10() converte da base x para a base 10
    // b10bx() converte da base 10 para a base x
    return b10bx(bxb10(nbx, bx), by);
}

function somaDigitos(d1, d2, d3) {
    d1 = (d1 == '1');
    d2 = (d2 == '1');
    // essa comparação é realizada a nivel de hardware
    // não se cria um programa para somar dois numeros binairos, se cria um hardware
    // referencia https://youtu.be/VBDoT8o4q00
    return [
        ((d1 && d2) || ((d1 ^ d2) && d3)),
        ((d1 ^ d2) ^ d3)
    ];
}

function somaBinariaCurta(b1, b2) {

    console.log((parseInt(b1, 2) + parseInt(b2, 2)).toString(2)); // soma binaria nativa, converte para inteiros, soma, converte para binario

    // forma "manual"
    b1 = b1.toString().split("");
    b2 = b2.toString().split("");
    let tamanho;
    if (b1.length > b2.length) {
        tamanho = b1.length;
    } else {
        tamanho = b2.length;
    }
    let sub = [0, 0];
    let resultado = "";
    let a, b;
    for (var i = 1; i <= tamanho; i++) {
        a = (i <= b1.length) ? b1[b1.length - i] : 0;
        b = (i <= b2.length) ? b2[b2.length - i] : 0;
        sub = somaDigitos(a, b, sub[0]);

        resultado = sub[1] + resultado;
    }
    if (sub[0] == '1') {
        resultado = 1 + resultado;
    }
    return resultado;
}