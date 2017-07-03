$(() => {
    var api_key = "040FA36AB25776E7072B0B42CAB25A20";
    $(document).keypress(e => {
        var key = e.which;
        if (key == 13) // the enter key code
        {
            $('#test').click();
            return false;
        }
    });
    $("#test").click(() => {
        var div = "<div id='info'><img alt='loading' src='https://media.giphy.com/media/y1ZBcOGOOtlpC/giphy.gif'></div>";
        $(".output").html(div);
        var custom_id = $("input").val();
        if (isNaN(custom_id)) {
            $.ajax({
                    url: `https://cors-anywhere.herokuapp.com/https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${api_key}&vanityurl=${custom_id}`,
                    dataType: 'json'
                })
                .done(data => {
                    var id_64bit = data.response.steamid;
                    if (!id_64bit) {
                        $(".output").html(`Not found 4Head`);
                    } else {
                        var id_32bit = convert(id_64bit);
                        $(".output").html(`<a href = "https://www.dotabuff.com/players/${id_32bit}">Dotabuff</a>`);
                        $("a").attr("target", "_blank");

                    }
                });
        } else {
            $.ajax({
                    url: `https://cors-anywhere.herokuapp.com/http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${api_key}&steamids=${custom_id}`,
                    dataType: 'json'
                })
                .done(data => {
                    if (!data.response.players[0]) {
                        $(".output").html(`Not found 4Head`);
                    } else {
                        var id_32bit = convert(custom_id);
                        $(".output").html(`<a href = "https://www.dotabuff.com/players/${id_32bit}">Dotabuff</a>`);
                        $("a").attr("target", "_blank");

                    }
                });
        }
    });

    function convert(bit64) {
        var big = bigInt(bit64);
        var minus = bigInt('76561197960265728');
        var result = big.subtract(minus);
        return result.value;
    }
});
