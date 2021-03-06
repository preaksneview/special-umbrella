/* * * * * * * * * * * * * * * * * * * * * * * * * 
 * aBuddy, the Accountabilibuddy Bot             *
 * v0.0.1 - 2018-01-22                           *
 * Jordan Boggs                                  *
 * * * * * * * * * * * * * * * * * * * * * * * * *
 */

/*
 * REMINDER SCHEDULE
 * ------------
 * Sun      Mon       Tue       Wed       Thu       Fri       Sat   
 * Gym                Gym                 Gym                 Gym
 * Meditate Meditate  Meditate  Meditate  Meditate  Meditate  Meditate
 * Meds     Meds      Meds      Meds      Meds      Meds      Meds
 * ----------------NIGHT TIME ONLY-------------------------------------
 * To-do    To-do     To-do     To-do     To-do     To-do     To-do
 * --------------------------------------------------------------------
 * Once in week
 * Deep condition and wash hair
 */

const name = "Britney";
const bud = "#buddy-chat";
const user = "#user-chat";
const day = new Date().getDay();
const hour = new Date().getHours();
let today = "";
let yes = 0;
let no = 0;

$(document).ready(function() {
  $(bud).append(
    `<h1>Welcome, ${name}!</h1>
    <p>It's me, your friend and buddy, aBuddy the Accountabilibuddy Bot! And 
    I'll always be there for you!</p>`
  );
  $(user).html(
    `<button id="greetings">Hi, buddy!</button>` 
  );
});

$(document).on("click", "#greetings", function() {
  $(bud).append(
    `<p>Hi, buddy!</p>`);
  $(bud).append(
    `<p>I'm going to ask you some questions so we can track your productivity. 
    Remember, you agreed to this earlier so you'd better tell the truth!</p>`
  );
  $(user).html(`<button id="continue">Okay...</button>`);
});

// This function is the last part
const finish = function() {
  $(user).html(
    `<button id="finish" class="finish-button">See you tomorrow!</button>`
  );

  if (yes > no) {
    $(bud).append(
      `<p>Great job, ${name}!</p>
       <p>You got so much done today. You should be proud! Keep up the good 
       work, and I'll see you tomorrow!</p>`);
  }
  else {
    $(bud).append(
      `<p>Well ${name}, you didn't do as much as you planned to. But don't beat 
      yourself up. Habits take time to build. Just remember: consistency is key!
       Keep it up, and I'll see you tomorrow!</p>`
    );
  }

  $(document).on("click", "#finish", function() {
    $(user).html("");
    $(bud).append(
      `<p>See you tomorrow!</p>`
    );
    $(bud).append(
      `<h1>Goodbye!</h1>`
    );
  });
};

// These functions ask you what you've done
const hair = function() {
  // Prompt
  $(bud).append(
    `<p>Have you deep conditioned and washed your hair yet this week?</p>`
  );
  $(user).html(
    `<button id="hair-yes" class="yes-button">Yep</button>
     <button id="hair-no" class="no-button">I'll do it later</button>`
  );

  // Result does not affect score
  $(document).on("click", "#hair-yes", function() {
    $(user).html("");
    $(bud).append(
      `<p>Yep</p>`
    );
    $(bud).append(
      `<p>So healthy and beautiful!</p>`
    );
    setTimeout(finish, 2000);
  });
  $(document).on("click", "#hair-no", function() {
    $(user).html("");
    if (day < 6) {
      $(bud).append(
        `<p>I'll do it later</p>`
      );
      $(bud).append(
        `<p>That's cool, you've got plenty of time. It's only ${today}.</p>`
      );
    }
    else if (day === 6) {
      $(bud).append(
        `<p>I'll do it later</p>`
      );
      $(bud).append(
        `<p>Well you better do it tomorrow! Because nobody cares if a Sunday 
        counts as this week or next week, but <em>you</em> care about getting it
         done!</p>`
      );
    }
    else {
      console.log("ERROR how did you get here?");
    }
    setTimeout(finish, 2000);
  })
};

const toDo = function() {
  // Only asks question at night
  if (hour >= 18 || hour <= 6) {
    // Prompt
    $(bud).append(
      `<p>Have you done your to-do list yet?</p>`
    );
    $(user).html(
      `<button id="todo-yes" class="yes-button">Done!</button>
       <button id="todo-no" class="no-button">Not yet...</button>`
    );

    // Results
    $(document).on("click", "#todo-yes", function() {
      yes++;
      $(user).html("");
      $(bud).append(
        `<p>Done!</p>`
      );
      $(bud).append(
        `<p>You're really on top of it today!</p>`
      );
      setTimeout(hair, 2000);
    });

    $(document).on("click", "#todo-no", function() {
      no++;
      $(user).html("");
      $(bud).append(
        `<p>Not yet...</p>`
      );
      $(bud).append(
        `<p>Well, it's not too late to do it before you go to bed...</p>`
      );
      setTimeout(hair, 2000);
    });
  }
  else if (hour > 6 && hour < 18) {
    hair();
  }
  else {
    console.log("ERROR how did you get here?");
  }
};

const meds = function() {
  // Question prompt
  $(bud).append(
    `<p>Did you remember to take your meds today?`
  );
  $(user).html(
    `<button id="meds-yes" class="yes-button">Yes</button>
     <button id="meds-no" class="no-button">No</button>`
  );

  // Result
  $(document).on("click", "#meds-yes", function() {
    yes++;
    $(user).html("");
    $(bud).append(
      `<p>Yes</p>`
    );
    $(bud).append(
      `<p>That's great! Consistency is key to healthy habits.</p>`
    );
    setTimeout(toDo, 2000);
  });

  $(document).on("click", "#meds-no", function() {
    no++;
    $(user).html("");
    $(bud).append(
      `<p>No</p>`
    );
    $(bud).append(
      `<p>I know you know this, but you really have to do that.</p>`
    );
    setTimeout(toDo, 2000);
  });
};

const meditate = function() {
  // Question prompt
  $(bud).append(
    `<p>Did you meditate today?</p>`
  );
  $(user).html(
    `<button id="meditate-yes" class="yes-button">Yes</button>
     <button id="meditate-no" class="no-button">No</button>`
  );

  // Result
  $(document).on("click", "#meditate-yes", function() {
    yes++;
    $(user).html("");
    $(bud).append(
      `<p>Yes</p>`
    );
    $(bud).append(
      `<p>Excellent! I can really feel your peaceful aura!</p>`
    );
    setTimeout(meds, 2000);
  });

  $(document).on("click", "#meditate-no", function() {
    no++;
    $(user).html("");
    $(bud).append(
      `<p>No</p>`
    );
    $(bud).append(
      `<p>Okay... but don't forget tomorrow.</p>`
    );
    setTimeout(meds, 2000);
  })
};

const gym = function() {
  // Question prompt
  $(bud).append(
    `<p>Since today is ${today}, that means it's a gym day! Did you work out 
    today?</p>`
  );
  $(user).html(
    `<button id="gym-yes" class="yes-button">Yes</button>
     <button id="gym-no" class="no-button">No</button>`
  );
  
  // Result
  $(document).on("click", "#gym-yes", function() {
    yes++;
    $(user).html("");
    $(bud).append(
      `<p>Yes</p>`
    );
    $(bud).append(
      `<p>Hey, not bad! Keep up the good work!</p>`
    );
    setTimeout(meditate, 2000);
  });
  
  $(document).on("click", "#gym-no", function() {
    no++;
    $(user).html("");
    $(bud).append(
      `<p>No</p>`
    );
    $(bud).append(
      `<p>Aw, too bad. Don't forget to go tomorrow!</p>`
    );
    setTimeout(meditate, 2000); 
  });
};

// This sets off the chain reaction of prompts
const reflection = function() {
  switch (day) {
    case 0:
      today = "Sunday";
      gym();
      break;
    case 1:
      today = "Monday";
      meditate();
      break;
    case 2:
      today = "Tuesday";
      gym();
      break;
    case 3:
      today = "Wednesday";
      meditate();
      break;
    case 4:
      today = "Thursday";
      gym();
      break;
    case 5:
      today = "Friday";
      meditate();
      break;
    case 6:
      today = "Saturday";
      gym();
      break;
  }
};
$(document).on("click", "#continue", function() {
  $(bud).append(
    `<p>Okay...</p>`
  );
  reflection();
});
