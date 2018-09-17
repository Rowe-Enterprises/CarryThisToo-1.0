var userData = null
var user = null
var email = null
var storageRef = null
var id = null
var db = null

document.addEventListener('DOMContentLoaded', function() {
    let app = firebase.initializeApp(config);
    db = firebase.firestore()
    const auth = firebase.auth()
    storageRef = firebase.storage().ref()

    auth.onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            document.getElementById('main').style.display = 'block'
            document.getElementById('loader').style.display = 'none'
            user = firebaseUser
            email = firebaseUser.email
            console.log(email)
            db.collection('users').where('email', '==', email).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    if (doc.exists) {
                        id = doc.id
                        console.log(doc.data())
                        userData = doc.data()
                        userData['uid'] = user.uid
                        delete userData['temp_pass']
                        delete userData['updated']
                        delete userData['type']
                        delete userData['form_url']
                        // console.log(userData)
                        if (userData.form_uploaded){
                            document.getElementById('document-status').innerHTML = "Document Uploaded"
                        }else{
                            document.getElementById('document-status').innerHTML = "Document Upload Pending"
                            document.getElementById('document-card').classList.add('red')
                            document.getElementById('document-card').classList.add('white-text')
                        }
        
                        if (userData.form_verified)
                            document.getElementById('verification-status').innerHTML = "Verified"
                        else
                            document.getElementById('verification-status').innerHTML = "Not Verified"

                        delete userData['form_uploaded']
                        delete userData['form_verified']
                        console.log(userData)
                        for (var key in userData) {``
                            // console.log(key)
                            document.getElementById(key).innerHTML = userData[key]
                        }
        
                        
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!")
                    }
                })
            }).catch(function(error) {
                console.log("Error getting document:", error)
            })
        }
    })
})

let dropArea = document.getElementById("drop-area")

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)   
    document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
dropArea.addEventListener(eventName, unhighlight, false)
})      

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('active')
}

function handleDrop(e) {
    var dt = e.dataTransfer
    var files = dt.files
    validateFile(files)
    handleFiles(files)
}

let uploadProgress = []
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
    progressBar.value = 0
    uploadProgress = []

    for(let i = numFiles; i > 0; i--) {
        uploadProgress.push(0)
    }
}

function updateProgress(fileNumber, percent) {
    uploadProgress[fileNumber] = percent
    let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
    console.debug('update', fileNumber, percent, total)
    progressBar.value = total
}

fileElem = document.getElementById('fileElem')
// fileElem.onchange = handleFiles(this.files)

function handleFiles(files) {
    files = [...files]
    // console.log('files', files)
    initializeProgress(files.length)
    files.forEach(validateFile)
    files.forEach(uploadFile)
}

function validateFile(file){
    var ext = file.name.split('.')[1]
    if(ext != 'pdf'){
        alert('please upload a pdf file')
    }else{
        previewFile(file)
    }
}

function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
        document.getElementsByClassName('loader-container')[0].style.display = 'block'
        document.getElementById('select-btn').setAttribute('disabled', 'true')
    }
}

function uploadFile(file, i) {
    var date = new Date()
    var metadata = {
        contentType: 'application/pdf'
    };
    var new_name = userData.uid + "_" + date.getTime()
    console.log(storageRef)
    var uploadTask = storageRef.child('forms/' + new_name).put(file, metadata);
    uploadTask.on('state_changed', function(snapshot){
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById('progress-bar').style.width = progress + '%';
        console.log('Upload is ' + progress + '% done');
        if (progress == 100){
            document.getElementById('upload-text').innerHTML = "Uploaded!";    
        }
        switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: 
            console.log('Upload is paused');
            break;
        case firebase.storage.TaskState.RUNNING: 
            console.log('Upload is running');
            break;
        }
    }, function(error) {
        // Handle unsuccessful uploads
    }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            var userDocRef = db.collection('users').doc(id);
            userDocRef.update({
                form_uploaded: true,
                form_url: downloadURL,
                form_verified: false
            })
            .then(function() {
                console.log("Document successfully updated!");
                document.getElementById('document-status').innerHTML = "Document Uploaded"
                document.getElementById('verification-status').innerHTML = "Not Verified"
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });            
        });
    });
}