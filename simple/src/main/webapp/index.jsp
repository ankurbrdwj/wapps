
<!DOCTYPE html>
<html>
<head>
<title>My App</title>
<link href="/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="metro-bootstrap-master/dist/css/metro-bootstrap.css" rel="stylesheet" type="text/css">
</head>
<body>
	<%@include file="_header.jsp"%>
	<section class="main container-fluid">
		<div class="container">
			<h1>home</h1>

			<div class="raw-fluid">
				<div class="col-md-3">SideBar</div>
				<div class="col-md-9">
					<tabset> <tab heading="Search">
					<div>
						<form action="simple" method="post">
							<p>
								Name<input type=text name="name" />
							</p>
							<p>
								<input type="submit" value="Enter Name" />
							</p>
							<p></p>
						</form>
					</div>
					</tab>
					<tab heading ="Next" >
						Yet More Static Content	
						</tab>				
					</tabset>
				</div>
			</div>
			</div>
	</section>
<script src="bootstrap/js/bootstrap.js"></script>
</body>
</html>