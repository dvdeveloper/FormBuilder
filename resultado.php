<html>
<head>
	<meta charset="utf-8">
	<title>Dv Developer - Formbuilder</title>

	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="formbuilder.css">

	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="formbuilder.js"></script>

</head>
<body>

	<div class="form-contenido container">
		<h2 class="dv">Dv Developer</h2>
		<a href="index.html"> Volver </a>
		<div class="debugg">
			<h1>Debug</h1>
			<?php
				if(isset($_POST['objecto'])){
					$object = stripslashes($_POST['objecto']);
					$object = json_decode($object,true);
					foreach ($object as $value) {
						foreach ($value as $key1 => $value1) {
							if(is_array($value1)){
								echo '----------  Listado de inputs  ------------ <br/>';
								for ($i=0; $i < count($value1) ; $i++) { 
									echo 'input:      '.$value1[$i]['value'].'<br/>';
								}
							}else{
								echo $key1.' : '.$value1;
							}
							echo '<br/>';
						}
					}
				}else{
					header('location: index.html');
				}
				
			?>
		</div>

	</div>

</body>
</html>

