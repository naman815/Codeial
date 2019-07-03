const Post = require('../models/post')
const Comment = require('../models/comment');


module.exports.create = async function(req, res){
try{
    let post = await Post.create({
        content: req.body.content,
        user: req.user._id
    });

    if(req.xhr){
        return res.status(200).json({
            data : {
                post : post
            },
            message : "post created!"
        });
    }
    

    req.flash('success', 'Post published');
    return res.redirect('back');
}catch(err){
    req.flash('Error',err);
    return;
}
}

module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

    //.id means converting id into string
    if(post.user == req.user.id){
        post.remove();

        if(req.xhr){
            return res.status(200).json({
                data : {
                    post_id : req.params.id
                },
                message : "Post deleted"
            })
        }
        Comment.deleteMany({post: req.params.id}, function(err){
            req.flash('success', 'Post and associated comments deleted');
            return res.redirect('back');
        })
    }else{
        req.flash('error', 'Login to delete');
        return res.redirect('back');
    }
    } catch(err){
        req.flash('Error',err);
        return;
    }
}