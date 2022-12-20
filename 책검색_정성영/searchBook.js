// JSON 
// Javascript Object Notation

//Object
/*{
    key1 : value1,
    key2 : value2,
    key3 : value3

}
*/

/*
{
    meta : ?,
    documents : ?
}
*/

// jQuery.ajax();
let pagenum = 1;
getData();
function getData() {
    $("#search").click(function () {
        $('.container').empty(); // 결과비우기
        
        $.ajax({
            method: "GET",
            url: "https://dapi.kakao.com/v3/search/book?target=title",
            data: {
                query: $("#query").val(), page:pagenum
            },
            headers: {
                Authorization: `KakaoAK ae8d78d574365f5eb2498c43da5e8fbb`
            }
        }).done(function (response) {
            console.log("response : ", response);
            const list = response.documents; //10개의 오브젝트

            list.forEach(e => {
                const thumbnail = e.thumbnail;
                const url = e.url;
                const title = e.title;
                const price = e.price;

                $('.container').append(
                    `
                    <article>
                        <div class="img"><a href="${url}"><img src="${thumbnail}"></a></div>
                        <div class="title">제목 : ${title}</div>
                        <dl>
                            <dt>가격 : <del class="price">${price}ㅡ></del></dt> <dt>세일가 : <dt class="sales">${price - price / 10}원</dt></dt>
                        </dl>
                    </article>
                    `
                );
            });
        });
    })

    $(window).scroll(function () {
        if (Math.ceil($(window).scrollTop()) + $(window).height() >= $(document).height()) {
            pagenum++;

            $.ajax({
                method: "GET",
                url: "https://dapi.kakao.com/v3/search/book?target=title",
                data: {
                    query: $("#query").val(), page:pagenum
                },
                headers: {
                    Authorization: `KakaoAK	ae8d78d574365f5eb2498c43da5e8fbb`
                }

            }).done(function (response) {
                console.log("response : ", response);
                const list = response.documents; //10개의 오브젝트

                list.forEach(e => {
                    const thumbnail = e.thumbnail;
                    const url = e.url;
                    const title = e.title;
                    const price = e.price;

                    $('.container').append(
                        `
                        <article>
                            <div class="img"><a href="${url}"><img src="${thumbnail}"></a></div>
                            <div class="title">제목 : ${title}</div>
                            <dl>
                                <dt>가격 : <del class="price">${price}ㅡ></del></dt> <dt>세일가 : <dt class="sales">${price - price / 10}원</dt></dt>
                            </dl>
                        </article>
                        `
                    );
                });
            });

        }

    });

}