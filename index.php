<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conversão de bases</title>
    <script type="text/javascript" src="jquery-3.6.0.min.js"></script>
    <style>
        span {
            text-decoration: underline;
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
        var digitos = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
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
                let digito = "";
                while (loop) {
                    if (nBase10 == 0) {
                        loop = false;
                    }
                    digito = digitos[nBase10 % base];
                    resultado += digito;
                    nBase10 = (nBase10 - nBase10 % base) / base;
                    $("#resposta").append(espaco + " " + digito + " |<span>" + base + " </span>\n");
                    $("#resposta").append(espaco + "'" + digito + "' " + nBase10 + "\n");
                    espaco += "    ";
                }

            $("#resposta").append("<br>"+resultado + "<br><br>");
            $("#resposta").append("Base" + base + ": " + resultado.split("").reverse().join("") + "<br>");
        }
    </script>
</body>

</html>