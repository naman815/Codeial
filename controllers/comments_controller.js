const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async function(req,res){
    try{
        let post= await Post.findById(req.body.post);

        

      if(post){
        let comment= await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user : req.user._id

            
        });
        post.comments.push(comment);
        post.save();

        comment = await comment.populate('user','name email' ).execPopulate();
        commentsMailer.newComment(comment);
        if(req.xhr){
            return res.status(200).json({
                data : {
                    comment : comment,
                    
                },

                message : 'Comment Created!'
            });
        }

        

        req.flash('success', 'Comment is added');
        res.redirect('/');
    }
    }
    catch(err){
        console.log('Error', err);
        return;
    }
} 

module.exports.destroy = async function(req,res){
    let comment = await Comment.findById(req.params.id);

    if(comment.user== req.user.id){
        let postId = comment.post;

        comment.remove();

        Post.findByIdAndUpdate(postId,{$pull : {comments: req.params.id}}, function(err,post){
            return res.redirect('back');
        })
    }else{
       return res.redirect('back');
   }
}