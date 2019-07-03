{
    let createComment = function(){
        let newCommentform = $('#new-comment-form');
        newCommentform.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/comments/create',
                data : newCommentform.serialize(),
                success : function(data){
                    let newComment = newCommentDom(data.data.comment);
                   $('#post-comments-list>ul').prepend(newComment);
                },

                error : function(error){
                    console.log('Error', error);
                    
                }
            });
        });
    }


    let newCommentDom = function(comment){
        return $(`<li>
            <p>
                
                    <small>
                        <a href="/comments/destroy/${comment.id}">X</a>
                    </small>
        
                
        
                ${comment.content}
                <br>
                <small>
                    ${ comment.user.name }
                </small>
            </p>
        </li>`)
    }

    createComment();
}