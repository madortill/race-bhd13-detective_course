// מערך השאלות והתשובות
var questionsAndAnswers = [{
    question: 'מתי תתבצע נצירת אזיקים?', // שאלה
    ans1: "רק כאשר העצור מתפרע", // תשובה 1
    ans2: "רק בגברים", // תשובה 2 
    ans3: "יש לנצור בכל מעצר", // תשובה 3
    ans4: "רק בעצורים עם חשד לבריחה", // תשובה 4
    correctAns: 3, // מספר התשובה הנכונה
    explanation: "" // הסבר לתשובה הנכונה
  },
  {
    question: 'כיצד ננהג במקרה שלעצור אין אמצעי הזדהות?',
    ans1: 'נתנצל על האירוע, נמלא דו"ח ונעזוב את הדירה',
    ans2: 'נעכב אותו לתחנת מ"י ונוציא פלט זיהוי',
    ans3: "נוכיח את זהותו לפי פרופיל רשת חברתית",
    ans4: 'נגיד לו להתייצב יום לאחר מכן בתחנת מ"צ עם אמצעי זיהוי',
    correctAns: 2,
    explanation: ""
  },
  {
    question: 'כמה בסיסי משטרה צבאית יש בצפון?',
    ans1: "2",
    ans2: "3",
    ans3: "4",
    ans4: "5",
    correctAns: 1,
    explanation: ""
  },
  {
    question: 'איזה בסיס נמצא תחת פיקודו של ממצ"פ צפון?',
    ans1: 'ענתות',
    ans2: "ג'למה",
    ans3:'יואב',
    ans4:'אשל',
    correctAns: 4,
    explanation:''
  },
  {
    question: 'מתי ניתן לשחרר את הכלוא מאזיקה?',
    ans1: 'בזמן אכילה',
    ans2: "בזמן הפסקה",
    ans3:'בזמן ישיבה',
    ans4:'כאשר המלווים נוכחים איתו',
    correctAns: 1,
    explanation:''
  },
  {
    question: 'על מה חשוב שנשים דגש בזמן ההקפה?',
    ans1: 'התקהלות',
    ans2: "מספר הרכבים ברחוב",
    ans3:'מרחק 40 מטר מראש החולייה',
    ans4:'הבניין שממול',
    correctAns: 1,
    explanation:''
  },
  {
    question: 'מהי דרגתה של הרמ"ח?',
    ans1: 'תת אלוף',
    ans2: 'אלוף משנה',
    ans3: "סגן אלוף",
    ans4: 'אלוף',
    correctAns: 2,
    explanation: ""
  },
  {
    question: 'באיזה בסיס נמצא מצ"ח באר שבע?',
    ans1: 'ערבה',
    ans2: 'ענתות',
    ans3: "אשל",
    ans4: 'מחנה נתן',
    correctAns: 4,
    explanation: ""
  }
];

var AMOUNT_OF_QUESTIONS = questionsAndAnswers.length; 

const START_QUESTION = -1;
var nCountQuestions = -1;
var nSelectedAns;
var nSuccess = 0;
var isFirstTime = true;
var nMistakes = 0;

var elExit;
var elAbout;
var elTitle;
var elExplanation;
var elCheckButton;
var elAnsContainer;
var elAnswers;
var elFeedback;
var elNextButton;
var elHelpButton;


/*
                load page
              =============
Description: load all elements
Parameters: none
---------------------------------------
Programer: Hila Tsivion
Date: 5/4/2020
---------------------------------------
*/
$(function() {
    // מטפל במצב שבו השחקן לחץ על ריפרש
    handleRefresh();
    
    $(".black").fadeOut();
    $(".darked").fadeIn();

    // כפתור עזרה (X)
    $(".exit").on("click", function() {
        $(".help-explanation").slideUp(800);
        $(".exit").hide();
        $(".exit").off("click");
        $(".darked").fadeOut();

        // בודק אם זאת הפעם הראשונה שנטען העמוד
        if (isFirstTime) {
            isFirstTime = false;
            setTimeout(function() {
                addElements();
            },1000);
        }
    });

    // כפתור עזרה
    $(".help").on("click", function() {
        $(".help-explanation").slideToggle(800);
        $(".exit").fadeToggle();
        $(".darked").fadeToggle();

        // בודק אם זאת הפעם הראשונה שנטען העמוד
        if (isFirstTime) { 
            isFirstTime = false;
            setTimeout(function() {
                addElements();
            },1000);
        }
        $(".exit").on("click", function() {
            $(".help-explanation").slideUp(800);
            $(".exit").hide();
            $(".exit").off("click");
            $(".darked").fadeOut();
        });
    });

});

function addElements() {
    // Shuffle the arry of the questions and answers randomly
    shuffle(questionsAndAnswers);

    // שינוי רקע
    $(".container-all").css("background-image", "url('../assets/images/bgamerican.svg')");
    
    // הוספת מיקומי תשובות
    $(".ans-container").fadeIn(500);
    $(".ans-container").css("display", "flex");
    
    // הוספת מיקום שאלה
    $(".question-conatiner").slideToggle(500);
    $(".question-conatiner").css("display", "flex");

    // הוספת כפתור בדוק
    $(".check-button-multiple-choice-test").fadeIn(1500);

    changeQuestion();
}

/*
        changeQuestion
       ================
Description: change question according 
             to the order of the array.
Parameters: none.
---------------------------------------
Programer: Hila Tsivion
Date: 25/3/2020
---------------------------------------
*/
function changeQuestion() {
    nCountQuestions++;

    // check if the current number of question equals to the sum of questions.
    if (nCountQuestions === AMOUNT_OF_QUESTIONS) {
        finished();
    }
    // the user stil practicing
    else {
        // check if the current question isn't the start 
        if (nCountQuestions !== 0) {
            $(".next-button").fadeOut(200);
            $(".next-button").off("click");
            $(".feed-back-container").html("");
        }
        $(".question-conatiner").text(questionsAndAnswers[nCountQuestions].question);
        changeAns();    
    }
}

/*
        changeAns
       ============
Description: 
Parameters: none.
---------------------------------------
Programer: Hila Tsivion
Date: 6/4/2020
---------------------------------------
*/
function changeAns() {
    nSelectedAns = START_QUESTION;

    // מוסיף כפור בדיקה, מוריד כפתור המשך (למקרה שזה לא פעם ראשונה) ומוריד פידבק
    $(".check-button-multiple-choice-test").fadeIn(500);
    $(".next-button").fadeOut();
    $(".feed-back-container").fadeOut(300);

    // add to all answers content, event listener, class and id.
    for (var nCount = 0; nCount < 4; nCount++) {
        $("#ans" +  Number(nCount + 1)).css({
            "background-image": "url('../assets/images/american.svg')",
            "transform": "unset"
        }); 
        $("#ans" + Number(nCount + 1)).text(questionsAndAnswers[nCountQuestions]['ans' + Number(nCount + 1)]);
        $("#ans" + Number(nCount + 1)).on("click", finalChoice);
    }
}

/*
        finalChoice
       =============
Description: 
Parameters: event.
---------------------------------------
Programer: Hila Tsivion
Date: 6/4/2020
---------------------------------------
*/
function finalChoice(event) {    
    // check if another answer was selected
    if (nSelectedAns !== START_QUESTION) {
        $("#ans" + nSelectedAns).css("background-image", "url('../assets/images/american.svg')");
    }
    // initialize new question
    else {
        // add event listener to check button
        $(".check-button-multiple-choice-test").on("click", checkAnswer);
    }
    nSelectedAns = event.currentTarget.id.slice(-1);
    $(event.currentTarget).css("background-image", "url('../assets/images/americanselect.svg')");
}

/*
        checkAnswer
       =============
Description: 
Parameters: none.
--------------------------------------- 
Programer: Hila Tsivion
Date: 6/4/2020
---------------------------------------
*/
function checkAnswer(event) {
    $(".check-button-multiple-choice-test").off("click"); 
    $(".check-button-multiple-choice-test").fadeOut();

    // remove event listeners from answers
    $(".ans").off("click");

    // check if the user answer is equal to the correct answer
    if (Number(nSelectedAns) === questionsAndAnswers[nCountQuestions].correctAns) {
        $("#ans" + nSelectedAns).css("background-image", "url('../assets/images/americanright.svg')");  
        
        $(".feed-back-container").html("<p class='right-ans'>תשובה נכונה!</p>");
        nSuccess++;
    }
    // the user answer is wrong
    else {
        $(".feed-back-container").html("<p class='wrong-ans'>תשובה לא נכונה!</p>");
        nMistakes++;

        // show chosen wrong answer 
        $("#ans" + nSelectedAns).css({
            "background-image": "url('../assets/images/americanwrong.svg')",
            "transform": "translate(0px, 42px) rotate(17deg)"
        });
        
        // show corrct answer
        $("#ans" + questionsAndAnswers[nCountQuestions].correctAns).css("background-image", "url('../assets/images/americanright.svg')");   
    }
    $(".feed-back-container").fadeIn(500);
    $(".feed-back-container").css("display", "flex");
    $(".feed-back-container").append(" " + questionsAndAnswers[nCountQuestions].explanation);
    
    // Next button
    $(".next-button").fadeIn(500);
    $(".next-button").on("click", changeQuestion);   
}
  
/*
                finished
              ============
Description: פונקציית הסיום המעבירה את המשתמש לביקורת על הצלחותיו
Parameters: none
---------------------------------------
Programer: Hila Tsivion
Date: 8/4/2020
---------------------------------------
*/
function finished() {
    // ניקוי המסך מאלמנטים
    $(".next-button").off("click");  
    $(".check-button-multiple-choice-test").off("click");
    $(".next-button").remove();
    $(".ans-container").remove();
    $(".question-conatiner").remove();
    $(".feed-back-container").remove();
    $(".help").remove();

    // שינוי רקע
    $(".container-all").css("background-image", "url('../assets/images/bgamericanfaded.svg')");
     
    //  הוספת מסך סיום לדף
    $(".end-game").fadeIn();
    $(".end-game").css("display", "flex");
    
    // הוספת ציון לאחוזי ההצלחה למערך הציונים
    let precentLostPoints = nMistakes / questionsAndAnswers.length * 100;
    var arrScore = [];
    arrScore = JSON.parse(sessionStorage.getItem("arrScore")); 
    arrScore.push(precentLostPoints);
    sessionStorage.setItem("arrScore", JSON.stringify(arrScore));
    
    // בודק אם המשתמש הצליח יותר מחצי מהשאלות
    if (Number(nSuccess / nCountQuestions * 100) >= 0.5) {
        $(".end-title").text("כל הכבוד!");
        $(".button-end").css("background-image", "url('../assets/images/continue.svg')");

        
        // הוספת מאזין לחיצה לחזרה למסלול
        $(".button-end").on("click", function(event) {
            window.onbeforeunload = null;
            window.onunload = null;
            sessionStorage.setItem("nCurrentExercise", Number(sessionStorage.getItem("nCurrentExercise")) + 1);
            window.location.href = "../lessonMap.html";
        });
    }
    // המשתמש לא הצליח יותר מחצי מהשאלות
    else {
        $(".end-title").text("ניסיון יפה...");
        $(".button-end").css("background-image", "url('../assets/images/tryagain.svg')");

        // הוספת מאזין לחיצה לחזרה למסלול
        $(".button-end").on("click", function(event) {
            window.onbeforeunload = null;
            window.onunload = null;
            location.reload();
        });
    }

    // בודק אם המשתמש הצליח שאלה אחת בלבד
    if (nSuccess === 1) {
        $(".total-feedback").text("הצלחתם שאלה אחת מתוך " + AMOUNT_OF_QUESTIONS);
    }
    // הצליח יותר משאלה אחת 
    else {
        $(".total-feedback").text("הצלחתם " + nSuccess + " שאלות מתוך " + AMOUNT_OF_QUESTIONS);
    }
}

/*
             shuffle
            =========
Description: take orgnaiz array and shffel it
Parameters: array.
------------------------------------------------
Programer: Gal 
Date: ?
------------------------------------------------
*/
function shuffle(arr) {
    var tmp = arr.slice();
    for (var i = 0; i < arr.length; i++) {
      var index = Math.floor(Math.random() * tmp.length);
      arr[i] = tmp[index];
      tmp = tmp.slice(0, index).concat(tmp.slice(index + 1));
    }
    return arr;
}
  
// מטפל בריפרש
function handleRefresh() {
    if (sessionStorage.getItem("restart")) {
        sessionStorage.removeItem("restart");
        location.assign("../main.html");
        return;
    }
    window.onbeforeunload = e => true;
    
    window.onunload = e => {
        sessionStorage.clear();
        sessionStorage.setItem("restart", true);
    }
}