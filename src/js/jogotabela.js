/*
 * A biblioteca jquery.ui com o módulo sortable é necessário.
 * Mais informações: https://jqueryui.com/sortable/
 */
 
/*
 * Com jquery, para selecionar elementos por atributo (tags extras que vão num elemento de html, como por exemplo href, name)
 * você coloca o nome dele entre [], por exemplo [data-objectTextContent]
 */
 
/*
 * Não seleciono os elementos por ID pois eu preciso repetir elementos, e ID deve ser único.
 */
 
 
// Define qual elemento contem os elementos arrastaveis
$(".objectsTexts").sortable({       
    // Define para onde os elementos podem ser arrastados, no caso defino o mesmo elemento pra ele poder ir e voltar
    connectWith: ".objectsTexts",   
 
    // Configura um elemento "fantasma" (famoso placeholder) para que apareça indicando onde o elemento será inserido
    placeholder: "placeholder",     
 
    // Define a opacidade dos elementos enquanto ele é arrastado
    opacity: 0.75,           
 
    // Callback que executa sempre que eu começo a arrastar um objeto       
    start: function (event, ui) {   
 
        // Fiz essa funçãozinha pra definir o tamanho e altura do placeholder igual do elemento que estou arrastando
        // ui.item[0] retorna o elemento arrastado
        // Utilizo outerWidth e outerHeight para ele pegar o valor do elemento baseado no seu tamanho total pela largura e altura das bordas
        $('.placeholder').css({                         
            'width': $(ui.item[0]).outerWidth(),
            'height': $(ui.item[0]).outerHeight(),
        });
    },
 
    //  Função para verificar se já existe um objeto depositado na celula da tabela
    //  O metodo receive executa sempre que você solta um elemento em outro
    receive: function(event, ui) {                      
 
        // Se já ouver um elemento na celular e o ID dela for diferente do elemento pai, tem q verificar o ID se não ele não permite retornar o elemento para a lista da esquerda
        if ($(this).children('[data-objectContent]').length > 1 && $(this).attr('id') != "objectsTexts") {     
             
            // Aviso opcional
            alert('Só um item por célula é permitido!');    
 
            // Ação que cancela a função sortable  
            $(ui.sender).sortable('cancel');    
        }
    }
});
 
// Apenas repeti a lógica, mas definindo para as imagens para que elas possam ir apenas onde for .objectsImages
$(".objectsImages").sortable({
    connectWith: ".objectsImages",      
    placeholder: "placeholder",        
    opacity: 0.75,
    start: function (event, ui) {
        $('.placeholder').css({
            'width': $(ui.item[0]).find('img').outerWidth(),
            'height': $(ui.item[0]).find('img').outerHeight(),
        });
    },
    receive: function(event, ui) {
        if ($(this).children('[data-objectContent]').length > 1 && $(this).attr('id') != "objectsImages") {
            alert('Só um item por célula é permitido!');
            $(ui.sender).sortable('cancel');
        }
    }
 
});
 
// Função que retorna os valores da tabela para utilizar como chamada jQuery
// Ex: $('.tabela-interativa').pegar_valores;
 
$.fn.pegar_valores = function() {
    //  Declara um array para que seja depositado os valores de cada linha nele... a idéia é que funcione como um array bidimensional.
    var $valores = [];
 
    // Procura dentro do elemento tabela, cada tr que estiver dentro do tbody, ou seja, vai passar linha por linha
    $(this).find('tbody tr').each(function() {
 
        // Declara uma array que receberá os valores de cada coluna
        var $valores_coluna = [];
 
        // passa coluna por coluna (...)
        $(this).find('td').each(function() {
            // (...)  adicionando o valor para o array $valores_coluna
            $valores_coluna.push($(this).find('[data-objectcontent]').attr('data-objectcontent'));
        });
 
        // adiciona a linha x com seus valores na variavel $valores
        $valores.push($valores_coluna);
    });
 
    // retorna o valor da variavel $valores para onde você quiser usar, seja uma variavel ou etc...
    // Ex: var meus_valores = $('.tabela-interativa').pegar_valores;
    return $valores;
}


// Função que retorna os valores da tabela para utilizar como função normal
// Esta função precisa de jquery
// Ex: pegar_valores($('.tabela-interativa'));
// A lógica é a mesma da função como jquery, na verdade fiz como plugin de jquery opcional mas eu prefiro pois fica mais simples utilizar
function pegar_valores($el) {

    var $var = {
            respostas: new Array(),
            vazios : 0,
            preenchidos : 0,
        };
   

    $($el).find('tbody tr').each(function() {

        var $valores_coluna = [];

        $(this).find('td').each(function() {

            var $conteudo = $(this).find('[data-objectcontent]').attr('data-objectcontent');
            $valores_coluna.push($conteudo);

            if($conteudo){
                $var.preenchidos++;
            }else{
                $var.vazios++;
            }

        });

        $var.respostas.push($var);
    });
    
    return $var;
}
