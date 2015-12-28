<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<title>AngularJS $http Example</title>
<style>
.username.ng-valid {
	background-color: lightgreen;
}

.username.ng-dirty.ng-invalid-required {
	background-color: red;
}

.username.ng-dirty.ng-invalid-minlength {
	background-color: yellow;
}

.email.ng-valid {
	background-color: lightgreen;
}

.email.ng-dirty.ng-invalid-required {
	background-color: red;
}

.email.ng-dirty.ng-invalid-email {
	background-color: yellow;
}
</style>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
</head>
<body ng-app="myApp" class="ng-cloak">
	<div class="generic-container" ng-controller="UserController as ctrl">
		<div class="panel panel-default">
			<div class="panel-heading">
				<span class="lead">User Registration Form </span>
			</div>
			<div class="formcontainer">
				<form ng-submit="ctrl.submit()" name="myForm"
					class="form-horizontal">
					<input type="hidden" ng-model="ctrl.user.userId" />
					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-label" for="file">First
								Name</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.userFname" name="fname"
									class="username form-control input-sm"
									placeholder="Enter your name" required ng-minlength="3" />
								<div class="has-error" ng-show="myForm.$dirty">
									<span ng-show="myForm.uname.$error.required">This is a
										required field</span> <span ng-show="myForm.uname.$error.minlength">Minimum
										length required is 3</span> <span ng-show="myForm.uname.$invalid">This
										field is invalid </span>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-label" for="file">Last
								Name</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.userLname" name="lname"
									class="username form-control input-sm"
									placeholder="Enter your name" required ng-minlength="3" />
								<div class="has-error" ng-show="myForm.$dirty">
									<span ng-show="myForm.uname.$error.required">This is a
										required field</span> <span ng-show="myForm.uname.$error.minlength">Minimum
										length required is 3</span> <span ng-show="myForm.uname.$invalid">This
										field is invalid </span>
								</div>
							</div>
						</div>
					</div>


					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-label" for="file">Address
								1</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.address1"
									class="form-control input-sm"
									placeholder="Enter your Address. [This field is validation free]" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-label" for="file">Address
								2</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.address2"
									class="form-control input-sm"
									placeholder="Enter your Address. [This field is validation free]" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-label" for="file">City</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.city"
									class="form-control input-sm"
									placeholder="Enter your Address. [This field is validation free]" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-label" for="file">State</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.state"
									class="form-control input-sm"
									placeholder="Enter your Address. [This field is validation free]" />
							</div>
						</div>
					</div>
					<div class="row">
						<div class="form-group col-md-12">
							<label class="col-md-2 control-label" for="file">Zip Code</label>
							<div class="col-md-7">
								<input type="text" ng-model="ctrl.user.zipCode"
									class="form-control input-sm"
									placeholder="Enter your Address. [This field is validation free]" />
							</div>
						</div>
						<div class="row">
							<div class="form-group col-md-12">
								<label class="col-md-2 control-label" for="file">Email</label>
								<div class="col-md-7">
									<input type="email" ng-model="ctrl.user.email" name="email"
										class="email form-control input-sm"
										placeholder="Enter your Email" required />
									<div class="has-error" ng-show="myForm.$dirty">
										<span ng-show="myForm.email.$error.required">This is a
											required field</span> <span ng-show="myForm.email.$invalid">This
											field is invalid </span>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-md-12">
								<label class="col-md-2 control-label" for="file">Phone</label>
								<div class="col-md-7">
									<input type="tel" ng-model="ctrl.user.userPhone" name="phone"
										class="tel form-control input-sm"
										placeholder="Enter your Phone Number " required />
									<div class="has-error" ng-show="myForm.$dirty">
										<span ng-show="myForm.email.$error.required">This is a
											required field</span> <span ng-show="myForm.email.$invalid">This
											field is invalid </span>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="form-actions floatRight">
								<input type="submit"
									value="{{!ctrl.user.userId ? 'Add' : 'Update'}}"
									class="btn btn-primary btn-sm" ng-disabled="myForm.$invalid">
								<button type="button" ng-click="ctrl.reset()"
									class="btn btn-warning btn-sm" ng-disabled="myForm.$pristine">Reset
									Form</button>
							</div>
						</div>
				</form>
			</div>
		</div>
		<div class="panel panel-default">
			<!-- Default panel contents -->
			<div class="panel-heading">
				<span class="lead">List of Users </span>
			</div>
			<div class="tablecontainer">
				<table class="table table-hover">
					<thead>
						<tr>
							<th>User ID.</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Address 1</th>
							<th>Address 2</th>
							<th>City</th>
							<th>State</th>
							<th>State</th>
							<th>Email</th>
							<th>Phone #</th>
							<th width="10%"></th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="u in ctrl.users">
							<td><span ng-bind="u.userId"></span></td>
							<td><span ng-bind="u.userFname"></span></td>
							<td><span ng-bind="u.userLname"></span></td>
							<td><span ng-bind="u.address1"></span></td>
							<td><span ng-bind="u.address2"></span></td>
							<td><span ng-bind="u.city"></span></td>
							<td><span ng-bind="u.state"></span></td>
							<td><span ng-bind="u.zipCode"></span></td>
							<td><span ng-bind="u.email"></span></td>
							<td><span ng-bind="u.userPhone"></span></td>
							<td>
								<button type="button" ng-click="ctrl.edit(u.id)"
									class="btn btn-success custom-width">Edit</button>
								<button type="button" ng-click="ctrl.remove(u.id)"
									class="btn btn-danger custom-width">Remove</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
    <script src="<c:url value="/js/angular.js" />"></script>
        <script src="<c:url value="app/app.js" />"></script>
            <script src="<c:url value="/app/service/user_service.js" />"></script>
                <script src="<c:url value="/app/controller/user_controller.js" />"></script>
                
	<!-- <script type="text/javascript" src="/WEBAPP/js/angular.js"></script>
	<script type="text/javascript" src="/WEBAPP/app/app.js"></script>
	<script type="text/javascript" src="/WEBAPP/app/service/user_service.js"></script>
	<script type="text/javascript" src="/WEBAPP/app/controller/user_controller.js"></script> -->
</body>
</html>