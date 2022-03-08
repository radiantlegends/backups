<?php include_once("content/header.php") ?>

<main class="container">
  <div class="game" id="crazy-eights">
    <div class="opponent-hand hand"></div>
    <div class="deck-container">
      <div class="deck"></div>
      <div class="pile"></div>
    </div>
    <div class="player-hand hand" id="player-hand"></div>
  </div>
</main>

<script src="js/games/crazy-eights.js" type="module"></script>

<?php include_once("content/footer.php"); ?>