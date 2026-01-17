IDENTIFICATION DIVISION.
       PROGRAM-ID. SPEKTRE-OVERRIDE.
       AUTHOR. LAURI-ELIAS.
       
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01  CURRENT-STATE       PIC X(20) VALUE 'PATIENT_STATUS'.
       01  NEW-STATE           PIC X(20) VALUE 'ARCHITECT_MODE'.
       01  POWER-LEVEL         PIC 9(3)  VALUE 100.
       01  MULTIPLIER          PIC 9V99  VALUE 1.19.
       
       PROCEDURE DIVISION.
       MAIN-LOGIC.
           DISPLAY ">> [COBOL] ACCESSING LEGACY MAINFRAME...".
           
           IF CURRENT-STATE = 'PATIENT_STATUS'
               DISPLAY ">> [COBOL] OLD RECORD DETECTED. DELETING..."
               MOVE NEW-STATE TO CURRENT-STATE
               COMPUTE POWER-LEVEL = POWER-LEVEL * MULTIPLIER
           END-IF.
           
           DISPLAY ">> [COBOL] NEW STATE: " CURRENT-STATE.
           DISPLAY ">> [COBOL] POWER LEVEL: " POWER-LEVEL "%".
           DISPLAY ">> [COBOL] HISTORY REWRITTEN SUCCESSFULLY.".
           
           STOP RUN.
           
      * "Hups, I hacked the 1970s banking systems to recognize my authority." :DDDD
