package com.pluralsight.model;

public class GoalReport {

	private int goalMinutes;
	private int exerciseMinutes;
	private String exerciseActivity;
	
	public GoalReport(int goalMinutes,int exerciseMinutes,String exerciseAcitvity){
		this.goalMinutes=goalMinutes;
		this.exerciseMinutes=exerciseMinutes;
		this.exerciseActivity=exerciseAcitvity;
	}
	
	
	/**
	 * @return the exerciseActivity
	 */
	public String getExerciseActivity() {
		return exerciseActivity;
	}
	/**
	 * @return the exerciseMinutes
	 */
	public int getExerciseMinutes() {
		return exerciseMinutes;
	}
	/**
	 * @return the goalMinutes
	 */
	public int getGoalMinutes() {
		return goalMinutes;
	}
	/**
	 * @param exerciseActivity the exerciseActivity to set
	 */
	public void setExerciseActivity(String exerciseActivity) {
		this.exerciseActivity = exerciseActivity;
	}
	/**
	 * @param exerciseMinutes the exerciseMinutes to set
	 */
	public void setExerciseMinutes(int exerciseMinutes) {
		this.exerciseMinutes = exerciseMinutes;
	}
	/**
	 * @param goalMinutes the goalMinutes to set
	 */
	public void setGoalMinutes(int goalMinutes) {
		this.goalMinutes = goalMinutes;
	}
	
}
