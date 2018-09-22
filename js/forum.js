let app = firebase.initializeApp(config);
const db = firebase.firestore();
const auth = firebase.auth();
var user = auth.currentUser;
var email = null;

document.addEventListener('DOMContentLoaded', function () {

    db.collection('forum').orderBy('created_at', 'desc').get()
        .then(function (querySnapshot) {
            // console.log(querySnapshot)
            querySnapshot.forEach(doc => {
                console.log(doc.id)
                var post = doc.data()
                var like_flag = false;
                var comment_list = "";
                db.collection('forum').doc(doc.id).collection('like').where('user_uid', '==', user.uid).get().then(function (querySnapshot) {
                    if (querySnapshot.size != 0) {
                        like_flag = true;
                    }
                }).catch(function (error) {

                })

                db.collection('forum').doc(doc.id).collection('comment').get().then(function (querySnapshot) {
                    comment_list = '<div id="comment-list" class="comment-list row"><h6 class="margin-left-16 col l12">Comments</h6><ul class="collection col l12">'
                    querySnapshot.forEach(comment => {
                        console.log(comment.data())
                        var comment_data = comment.data()
                        // var comment_date = new Date(cooment.commented_at)
                        comment_list += '<li class="collection-item"><p class="margin-0"><span class="bold">' + comment_data.name + ' @' + comment_data.user_uid + ': </span><span class="margin-left-8">' + comment_data.comment_message + '</p><p style="font-size: 11px;">' + comment_data.commented_at + '</p></li>'

                    })
                    comment_list += '</ul></div>'
                    // var post_el = '<div class="card"><div class="card-content padding-bottom-0"><div class="card-title row"><h4 class="bold">'+ post.subject +'</h4><h6 class="bold">'+ post.name +' | @'+ post.user_uid +'</h6><h6 class="bold">'+ post.state +'</h6></div><p class="post-test">'+ post.message +'</p><br></div>'+ comment_list +'<div class="card-action row valign-wrapper"><div class="col l1 center"><a class="margin-0 '+ like_color +'" id="upvote-1" href="#" onclick="upvote(this, \''+ doc.id +'\');"><i class="material-icons">thumb_up</i></a><br><p class="margin-0">'+ post.like +'</p></div><div class="col l11 valign-wrapper"><div class="col l10"><input type="text" placeholder="Drop your comment here" class="comment-box"></div><div class="col l2 center"><input type="button" onclick="comment(this, \''+ doc.id +'\')" class="btn blue accent-2 " value="Comment"></div></div></div>'

                    if (like_flag)
                        var like_color = "blue-text"
                    else
                        var like_color = "grey-text"
                    
                    // console.log(post.user_uid == user.uid)
                    if (post.user_uid == user.uid) {
                        var post_el = '<div class="card"><div class="card-content padding-bottom-0"><div class="card-title row"><div class="col l10"><h4 class="bold">' + post.subject + '</h4><h6 class="bold">' + post.name + ' | @' + post.user_uid + '</h6><h6 class="bold">' + post.state + '</h6></div><div class="col l2"><a href="#"><i class="material-icons margin-right-16">edit</i></a><a href="#"><i class="material-icons">delete</i></a></div></div><p class="post-test">' + post.message + '</p><br></div>' + comment_list + '<div class="card-action row valign-wrapper"><div class="col l1 center"><a class="margin-0 ' + like_color + '" id="upvote-1" href="#" onclick="upvote(this, \'' + doc.id + '\');"><i class="material-icons">thumb_up</i></a><br><p class="margin-0">' + post.like + '</p></div><div class="col l11 valign-wrapper"><div class="col l10"><input type="text" placeholder="Drop your comment here" class="comment-box"></div><div class="col l2 center"><input type="button" onclick="comment(this, \'' + doc.id + '\')" class="btn blue accent-2 " value="Comment"></div></div></div></div>'
                    } else {
                        var post_el = '<div class="card"><div class="card-content padding-bottom-0"><div class="card-title row"><h4 class="bold">' + post.subject + '</h4><h6 class="bold">' + post.name + ' | @' + post.user_uid + '</h6><h6 class="bold">' + post.state + '</h6></div><p class="post-test">' + post.message + '</p><br></div>' + comment_list + '<div class="card-action row valign-wrapper"><div class="col l1 center"><a class="margin-0 ' + like_color + '" id="upvote-1" href="#" onclick="upvote(this, \'' + doc.id + '\');"><i class="material-icons">thumb_up</i></a><br><p class="margin-0">' + post.like + '</p></div><div class="col l11 valign-wrapper"><div class="col l10"><input type="text" placeholder="Drop your comment here" class="comment-box"></div><div class="col l2 center"><input type="button" onclick="comment(this, \'' + doc.id + '\')" class="btn blue accent-2 " value="Comment"></div></div></div>'
                    }

                    console.log(comment_list)
                    document.getElementById('post-container').innerHTML += post_el
                    
                }).catch(function (error) {

                })
                // var elems = document.querySelecto('.dropdown-trigger');
                // var instances = M.Dropdown.init(elems, {});
                // document.getElementById('post-container').innerHTML += '<div class="card"><div class="card-content"><div><h5 class="question">'+ post.message +'</h5><div class="upvote-btn left center-align"><i class="material-icons upvote-icon">keyboard_arrow_up</i><br><span>'+ post.like +' votes</span></div></div><p><span class="right">'+ post.comments +' Comments</span></p></div><div class="card-action"><a href="viewpost.html?id="'+ doc.id +' class="btn btn-flat grey lighten-4">VIEW</a><a href="#" class="btn btn-flat blue white-text">Submit Answer</a></div></div>'
            });
        })
        .catch(function (error) {

        })

    auth.onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            document.getElementById('main').style.display = 'block'
            document.getElementById('loader').style.display = 'none'
            user = firebaseUser;
            // g_user = user;
            email = firebaseUser.email;
            // console.log(user.displayName, user.uid)
        }
    });

})

function upvote(el, id) {
    db.collection('forum').doc(id).collection('like').where('user_uid', '==', user.uid).get().then(function (querySnapshot) {
        console.log(querySnapshot)
        console.log(querySnapshot.size)
        if (querySnapshot.size == 0) {
            var like = Number(el.parentElement.children[2].innerHTML)
            console.log(Number(el.parentElement.children[2].innerHTML) + 1)
            var docRef = db.collection('forum').doc(id)
            var likeData = {
                name: user.displayName,
                user_uid: user.uid
            }
            var docRefDeep = db.collection('forum').doc(id).collection('like').add(likeData).then(function () {
                docRef.update({
                    like: like + 1
                })
                    .then(function () {
                        console.log("Document successfully updated!");
                        el.parentElement.children[2].innerHTML = like + 1
                    })
                    .catch(function (error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            }).catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });


        }
    })
}

function comment(el, id) {
    var comment_message = el.parentElement.parentElement.children[0].children[0].value
    var commentData = {
        comment_message: comment_message,
        name: user.displayName,
        user_uid: user.uid,
        commented_at: new Date()
    }

    console.log(commentData)

    db.collection('forum').doc(id).collection('comment').add(commentData).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        // var data  = docRef.data()
        document.getElementById('comment-list').children[1].innerHTML += '<li class="collection-item"><p class="margin-0"><span class="bold">' + user.displayName + ' @' + user.uid + ': </span><span class="margin-left-8">' + commentData.comment_message + '</p><p style="font-size: 11px;">' + commentData.commented_at + '</p></li>'
    })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}
