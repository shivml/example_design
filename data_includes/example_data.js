PennController.ResetPrefix(null); // Initiates PennController

// Start typing your code here
PennController.Sequence( "welcome",randomize("trial"), "send", "final" )


PennController ("welcome",
                defaultText
                .settings.css("font-size", "25")
    ,
                newText("Welcome", "Welcome to the experiment!")
               .print()
    ,
               newText("instructions", "<p> You will be reading sentences in German, they consist of two parts, the target sentence and context sentence.</br> Please press the spacebar to read the complete sentence, and press the continue button for the next trial</p>")
               .print()
               ,
               newButton("continue", "continue")
               .settings.center()
               .print()
               .wait()
               )
                
// Trial 1
PennController.Template(
    PennController.GetTable("stimulitest.csv"),  // load your csv
    variable => PennController("trial",
                               defaultText
                               .settings.css("font-size", "30")
                               ,
                              newTimer(500)
                               .start()
                               .wait()
                                ,
                              newText("wait", "press spacebar to continue")
                               .settings.css("font-size","15")//press spacebar to continue trial
                               .print()
                                ,
                              newKey("start"," ")
                               .settings.log() // Key press and logged start of experiment
                               .wait()
                                ,
                              getText("wait")
                               .remove()
                               ,
                               newText("context", variable.context)  // context sentence
                               .settings.italic()
                               .print()
                               ,
                               newKey("context_key", " ")
                               .wait()                               
                               ,
                                getText("context")
                               .remove()
                               ,
                               newText("word1", variable.word1)  // first word- article
                               .settings.italic()
                               .print()
                               ,
                               newKey("word1_key", " ")
                               .settings.log()
                               .wait()
                               ,
                                getText("word1")
                               .remove()
                               ,
                               
                               newText("word2", variable.word2)  // second word- noun
                               .settings.italic()
                               .print()
                               ,
                               newKey("word2_key", " ")
                               .settings.log()
                               .wait()
     ,
                                getText("word2")
                               .remove()
                                                           
                               ,
                               newText("word3", variable.word3)  // third word- Critical word
                               .settings.italic()
                               .print()
                                ,
                               newKey("word3_key", " ")
                               
                               .wait()
     ,
                                getText("word3")
                               .remove()
                               
                               ,
                               newText("word4",variable.word4)  // fourth word- article SPILLOVER
                               .settings.italic()
                               .print()
                               ,
                               newKey("word4_key", " ")
                              .wait()
     ,
                                getText("word4")
                               .remove()
                               ,
                               
                               newText("word5", variable.word5)  // fifth word- noun 2 SPILLOVER
                               .settings.italic() 
                               .print()
                               ,
                               newKey("word5_key", " ")
                               .wait()
     ,
                                getText("word5")
                               .remove()
                              , 
                               newText("question", "Wie akzeptabel ist dieser Satz?")
                                .settings.css("font-size","25")
                               .print()
                               ,
                               newScale("scale", 6)
                               .settings.center()
                               .settings.before( newText("notacceptable", "inakzeptabel") 
                                                .settings.css("font-size","15"))
                               .settings.after( newText("acceptable", "sehr akzeptabel") 
                                                .settings.css("font-size","15"))
                               .settings.labelsPosition("bottom")
                               .print()
                               .settings.log()
                               .wait()   
                               ,
                               newButton("continue", "Continue")
                               .print()
                               .settings.center()
                               .wait()
                               ,
                               getText("question")
                               .remove()
                               ,
                               getScale("scale")
                               .remove()
                              ,
                                getKey("context_key").settings.log(),
                                getKey("word1_key").settings.log(),
                                getKey("word2_key").settings.log(),
                                getKey("word3_key").settings.log(),
                                getKey("word4_key").settings.log(),
                                getKey("word5_key").settings.log()
                               
                               )
    .log("Item",variable.Item)
    .log("Soc_stat", variable.Soc_stat)
    .log( "condition" , variable.condition));
                              
                              
                             
// 3. Send results

PennController.SendResults( "send" ); // important!!! Sends all results to the server; MUST be used if you create a Goodbye screen (which should come AFTER SendResults!)


//=====================================================
// 4. Thank you screen

PennController("final",
               newText("<p>Thank you for your participation!</p>")
               .print()
               ,
               newButton("void") // this creates a 'void' button that must be clicked to continue. This is because we don't want them to be able to continue beyond this screen
               .wait() // so basically this is the end and there's no way to go any further because we DO NOT PRINT THE 'VOID' BUTTON!!!
)
    
