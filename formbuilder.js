$(function(){

    var key_element = 912938;
    var key_li = 21739213;
    
    $( "#sortable-element li" ).draggable({
        appendTo: "body",
        helper: function() {
            return $("<ul class='sortable-element'></ul>").append( $(this).clone() );
        }
    });



    $( "#sortable-content" ).droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        accept: ":not(.ui-sortable-helper)",
        
        drop: function( event, ui ) {
            
            $('.dropzone').remove();
            $( this ).find( ".placeholder" ).remove();
            var elemento = $(ui.draggable).attr('attr-type');
            var input;

            switch(elemento){
                case "text":
                    input = "<div id='"+key_element+"' attr-type='text' class='input-dynamic'> "+
                                "<p class='textarea-left'><strong id='label"+key_element+"'>Nombre</strong> </p> <input type='text' value='' /> "+
                                "<div class='input-delete'> "+event_group(key_element,'text')+" </div>"+
                            "</div>";
                break;

                case "textarea":
                    input = "<div id='"+key_element+"' attr-type='textarea' class='input-dynamic'> "+
                                "<p class='textarea-left'><strong id='label"+key_element+"'>Nombre</strong> </p> <textarea></textarea> "+
                                "<div class='input-delete'> "+event_group(key_element,'textarea')+" </div>"+
                            "</div>";
                break;

                case "lista":
                    input = "<div id='"+key_element+"' attr-type='lista' class='input-dynamic'> <p class='textarea-left'><strong id='label"+key_element+"'>Nombre</strong> </p> "+
                                "<select class='list"+key_element+"'>  "+
                                    "<option>Lista 1</option>"+
                                    "<option>Lista 2</option>"+
                                    "<option>Lista 3</option>"+
                                "</select>"+ 
                                "<div class='input-delete'> "+event_group(key_element,'lista')+" </div>"+
                            "</div>";
                break;

                case "checklist":
                    input = "<div id='"+key_element+"' attr-type='checklist' class='input-dynamic'> <p class='textarea-left'><strong id='label"+key_element+"'>Nombre</strong> </p>"+
                                "<div class='input-delete'> "+event_group(key_element,'checklist')+" </div>"+
                                "<div class='radio-check list"+key_element+"'>"+                  
                                    "<input type='checkbox' name='option1' value='checkbox1'> <span>Checkbox 1</span><br>"+
                                    "<input type='checkbox' name='option2' value='checkbox2'> <span>Checkbox 2</span><br>"+
                                    "<input type='checkbox' name='option3' value='checkbox3'> <span>Checkbox 3</span><br>"+
                                "</div>"+
                            "</div>";
                break;

                case "radio":
                    input = "<div id='"+key_element+"' attr-type='radio' class='input-dynamic'> <p class='textarea-left'><strong id='label"+key_element+"'>Nombre</strong> </p>"+
                                "<div class='input-delete'> "+event_group(key_element,'radio')+" </div>"+
                                "<div class='radio-check list"+key_element+"'>"+                   
                                    "<input type='radio' name='group1' value='radio1'> <span>radio 1</span> <br>"+
                                    "<input type='radio' name='group1' value='radio2'> <span>radio 2</span> <br>"+
                                    "<input type='radio' name='group1' value='radio3' checked> <span>radio 3</span>"+
                                "</div>"+
                            "</div>";
                break;

            }

            $( "<li id='key"+key_element+"' attr-key='"+key_element+"'></li>" ).append(input).appendTo( this );
            key_element++;
        }
    }).sortable({
        items: "li:not(.placeholder)",
        sort: function() {
            $( this ).removeClass( "ui-state-default" );
        }
    });



    $("body").on('click','.eliminar-input',function(){
        var key = $(this).attr('attr-keyelemento');
        $("#key"+key).remove();
    })

    $("body").on('click','.editar-input',function(){
        
        var type = $(this).attr('attr-type');
        var key = $(this).attr('id');
        var label = $("#label"+key).text();
        mode_edition(type,label,key);
    });

    $("body").on('click','.save-edit',function(){
        var key = $(this).attr('attr-key') ;
        var type = $(this).attr('attr-type');
        
        var label =  $("#input-etiqueta").val();
        $("#label"+key).html(label);

        switch(type){
            case "lista":

                var lista_option = "";
                $(".list-inputform li input").each(function(){
                    lista_option += "<option>"+ $(this).val() +"</option>";
                });
                $(".list"+key).html(lista_option);
            break;

            case "checklist":
                var lista_option = "";
                $(".list-inputform li input").each(function(){
                    lista_option += "<input type='checkbox' value='"+ $(this).val() +"'> <span> "+ $(this).val() +" </span><br>";
                });
                $(".list"+key).html(lista_option);
            break;


            case "radio":
                var lista_option = "";
                $(".list-inputform li input").each(function(){
                    lista_option += "<input type='radio' name='group1' value='"+ $(this).val() +"'> <span>"+ $(this).val() +"</span> <br>";
                });
                $(".list"+key).html(lista_option);
            break;
        }

        close_edition();
    })

    $("body").on('click','.btn-add-check',function(){
        $(".list-inputform").append("<li class='dynamic-list"+key_li+"'><input type='text' value='' > "+event_delete_edition(key_li)+" </li>");
        key_li++;
    })


    $("body").on('click','.del-dynamic-li',function(){
        var key = $(this).attr('attr-del');
        $('.dynamic-list'+key).remove();
    })

    function mode_edition(type,label,key){

        $("#dialog-form").dialog({ position: [70,100] });

        var add_list = "";
        var type;

        switch(type){
            case "lista":
                type = "lista";
                var li_option = "";
                $(".list"+key+" option").each(function(){
                    li_option += "<li class='dynamic-list"+key_li+"' ><input type='text' value='"+$(this).val()+"' > "+event_delete_edition(key_li)+" </li>";
                    key_li++;
                });

                add_list = "<div class='list-checkform'>"+
                                "<a class='btn-add-check' href='#'>agregar</a>"+
                                "<ul class='list-inputform'>"+li_option+"</ul>"+
                            "</div>";
            break;

            case "checklist":
                type = "checklist";
                var li_option = "";
                $(".list"+key+" input").each(function(){
                    li_option += "<li class='dynamic-list"+key_li+"' ><input type='text' value='"+$(this).val()+"' > "+event_delete_edition(key_li)+" </li>";
                    key_li++;
                });

                add_list = "<div class='list-checkform'>"+
                                "<a class='btn-add-check' href='#'>agregar</a>"+
                                "<ul class='list-inputform'>"+li_option+"</ul>"+
                            "</div>";
            break;

            case "radio":
                type = "radio";
                var li_option = "";
                 $(".list"+key+" input").each(function(){
                    li_option += "<li class='dynamic-list"+key_li+"' ><input type='text' value='"+$(this).val()+"' > "+event_delete_edition(key_li)+" </li>";
                    key_li++;
                });

                add_list = "<div class='list-checkform'>"+
                                "<a class='btn-add-check' href='#'>agregar</a>"+
                                "<ul class='list-inputform'>"+li_option+"</ul>"+
                            "</div>";
            break;
        }

        var contenido = "<div class='edit-builderform'>"+
                            "<div class='list-buildergeneral'>"+
                                "<p>Etiqueta</p>"+
                                "<input type='text' value='"+label+"' id='input-etiqueta'/>"+
                            "</div>"+add_list+
                        "</div>"+

                        "<a class='btn-builderform save-edit' attr-type='"+type+"' attr-key='"+key+"' href='#''>Guardar</a>";

        $(".body-propiedades").html(contenido);
    }



    function close_edition(){
        $("#dialog-form").dialog('close');
        $(".body-propiedades").html("");
    }

    function event_group(key,type){
        return "<div class='btn-group btn-group-xs'>"+
                  "<button id='"+key+"' attr-type='"+type+"' type='button' class='btn btn-default editar-input'><span class='glyphicon glyphicon-edit'></span> Editar</button>"+
                  "<button attr-keyelemento='"+key+"' type='button' class='btn btn-danger eliminar-input'><span class='glyphicon glyphicon-remove'></span> Eliminar </button>"+
                "</div>"
    }

    function event_delete_edition(key){
        return "<a class='del-dynamic-li' attr-del='"+key+"' href='#eliminar'><span class='glyphicon glyphicon-remove'></span></a> ";
    }


    $("#btn-guardar-formbuilder").on('click',function(){
        
        var objecto = []
        $("#sortable-content li").each(function(){
            
            var key =  $(this).attr('attr-key');
            var type = $("#"+key).attr('attr-type');
            var label = $("#label"+key).text();

            var input = new Array();
            switch(type){
                case "lista":
                    $(".list"+key+" option").each(function(){

                        input.push({
                            value: $(this).text()
                        });
                    })
                break;

                case "checklist":
                    $(".list"+key+" input").each(function(){
                        input.push({
                            value: $(this).val()
                        });
                    })
                break;

                case "radio":
                    $(".list"+key+" input").each(function(){
                        input.push({
                            value: $(this).val()
                        });
                    })
                break;
            }

            var item = {
                "key" : key,
                "type" : type,
                "label" : label,
                "input" : input
            }

            objecto.push(item);

        });

        
        $("#objecto_form").val(JSON.stringify(objecto));
        $("#form-submit").submit();

    });
    
    
});