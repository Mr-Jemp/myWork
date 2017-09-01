$(function() {



$.ajax({ url: "/handler/runtimeWeb.ashx", dataType: "json", type: "POST", data: { operatetype: "getUser" },
        success: function(data) {
            var ss = "";
            var hh = "";
            try {
//                alert(JSON.stringify(data));
                $("#nickname").val(data.nickname);
//                alert(data.nickname);
                $("#phone").val(data.phone);
                $("#email").val(data.email);
                $("input:radio").each(function() {
                    if (data.sex == $(this).val()) {
                        $(this).prop("checked", "checked");
                        $("input:radio").checkboxradio("refresh");
                    }
                });
                var birt = data.birthday;
                //birt.substring(0, birt.indexOf(" "))
                //                $("#birthday").mobiscroll().date();
                //                $("#blood option").each(function() {
                //                    //data.blood
                //                    if (data.blood == $(this).val()) {
                //                        $("#blood").val($(this).text());
                //                        $("#constellation").selected = true;
                //                    }
                //                });
                //                $("#constellation option").each(function() {
                //                    if (data.constellation == $(this).val()) {
                //                        $("#constellation").val($(this).text());
                //                        $("#constellation").selected = true;
                //                    }
                //                });
                $("#officephone").val(data.officephone);
                $("#officefax").val(data.officefax);
                $("#qq").val(data.qq);
                $("#weibo").val(data.weibo);
                $("#familyaddress").val(data.familyaddress);
                $("#familyphone").val(data.familyphone);
                $("#zipcode").val(data.zipcode);
            } catch (e) {
            }
        },
        error: function(XMLHttpRequest, textStatus) {
        }
    });


    function setUser() {
        var nickname, phone, email, sex, birthday, blood, constellation, officephone, officefax, qq, weibo, familyaddress, familyphone, zipcode;
        nickname = $("#nickname").val();
        phone = $("#phone").val();
        email = $("#email").val();
        $("input:radio").each(function() {
            if (this.checked) {
                sex = $(this).val();
            }
        });
        birthday = $("#birthday").val();
        blood = $("#blood").val();
        constellation = $("#constellation").val();
        officephone = $("#officephone").val();
        officefax = $("#officefax").val();
        qq = $("#qq").val();
        weibo = $("#weibo").val();
        familyaddress = $("#familyaddress").val();
        familyphone = $("#familyphone").val();
        zipcode = $("#zipcode").val();
        $.ajax({ url: "/handler/runtimeWeb.ashx", type: "POST", data: { operatetype: "setUser", nickname: escape(nickname), phone: escape(phone), email: escape(email), sex: escape(sex), birthday: escape(birthday), blood: escape(blood), constellation: escape(constellation), officephone: escape(officephone), officefax: escape(officefax), qq: escape(qq), weibo: escape(weibo), familyaddress: escape(familyaddress), familyphone: escape(familyphone), zipcode: escape(zipcode) },
            success: function(data) {
                if (data == "1") {
                    alert("修改成功！");
                }
                else {
                    alert("修改失败~~~~");
                }
            },
            error: function(XMLHttpRequest, textStatus) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
                alert("无法访问2");
            }
        });
    }


});