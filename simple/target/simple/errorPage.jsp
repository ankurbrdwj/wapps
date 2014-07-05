<%@page isErrorPage="true"%>
<!DOCTYPE html>
<html>
<head>
<title>My App</title>
<link href="/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="metro-bootstrap-master/dist/css/metro-bootstrap.css" rel="stylesheet" type="text/css">
</head>
<body>
<h2>Error Page</h2>
<%= exception.getMessage() %>
<%=exception.getMessage() %>
</body>
</html>