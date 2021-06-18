<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conversão de bases</title>
    <script type="text/javascript" src="jquery-3.6.0.min.js"></script>
    <style>
        .u {
            text-decoration: underline;
        }

        .d {
            color: #f00;
        }
    </style>
</head>

<body>
    Número na base 10: <input id="numero" type="number" placeholder="base10"><br>
    Base para Conversão: <input id="base" type="number" placeholder="base" min="2" max="36" value="2">
    <div>
        <pre id="resposta">
        </pre>
    </div>
    <script type="text/javascript">
        var digitos = {
            "0": 0,
            "1": 1,
            "2": 2,
            "3": 2,
            "4": 4,
            "5": 5,
            "6": 6,
            "7": 7,
            "8": 8,
            "9": 9,
            "a": 10,
            "b": 11,
            "c": 12,
            "d": 13,
            "e": 14,
            "f": 15,
            "g": 16,
            "h": 17,
            "i": 18,
            "j": 19,
            "k": 20,
            "l": 21,
            "m": 22,
            "n": 23,
            "o": 24,
            "p": 25,
            "q": 26,
            "r": 27,
            "s": 28,
            "t": 29,
            "u": 30,
            "v": 31,
            "w": 32,
            "x": 33,
            "y": 34,
            "z": 35
        };
        var caracteres = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        $("#numero").keyup(function() {
            calculaConversao();
        });
        $("#numero").change(function() {
            calculaConversao();
        });
        $("#base").keyup(function() {
            calculaConversao();
        });
        $("#base").change(function() {
            calculaConversao();
        });

        function calculaConversao() {
            let base = $("#base").val();
            let nBase10 = $("#numero").val();
            let resultado = "";
            let espaco = "";
            let loop = true;
            $("#resposta").html('');
            let digito = "0";
            if (nBase10 == 0) {
                $("#resposta").append(espaco + " " + nBase10 + " |<span class='u'>" + base + " </span>\n");
                $("#resposta").append(espaco + " <span class='d'>" + digito + "</span>  " + nBase10 + "\n");
                resultado = "0";
            }
            while (nBase10 > 0) {

                digito = caracteres[nBase10 % base];
                resultado += digito;
                $("#resposta").append(espaco + nBase10 + "|<span class='u'>" + base + " </span>\n");
                nBase10 = (nBase10 - nBase10 % base) / base;
                $("#resposta").append(espaco + "<span class='d'>" + digito + "</span>  " + nBase10 + "\n");
                espaco += "    ";
            }


            $("#resposta").append("<br>" + resultado + "<br><br>");
            $("#resposta").append("Base" + base + ": " + resultado.split("").reverse().join("") + "<br>");
        }
    </script>
</body>

</html>