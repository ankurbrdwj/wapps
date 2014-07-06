<%@page import="java.util.Calendar"  %>
<%@page import="com.ankur.controller.*" %>
<!DOCTYPE html>
<html>
<head>
<title>My App</title>
<link href="/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="metro-bootstrap-master/dist/css/metro-bootstrap.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
</head>
<body>
	<%@include file="_header.jsp"%>
	<section class="main container-fluid">
	<% Calendar calendar=Calendar.getInstance(); %>
		<div class="container">
			<h1>Home</h1>

			<div class="raw-fluid">
				<div class="col-md-3"><%= calendar.getTime().toString() %></div>
				
				<div class="col-md-9">
				<% User user=(User)request.getAttribute("user");
				if(user==null){
					user=new User();
				}
				
				%>
					<tabset> <tab heading="Search">
					<div>
					<h2>Welcome : <%= user.getName() %></h2>
						<form action="home" method="post">
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