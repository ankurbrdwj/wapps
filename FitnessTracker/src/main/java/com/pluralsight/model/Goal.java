package com.pluralsight.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Range;


@Entity
@Table(name="goals")
//@NamedQueries({
//	@NamedQuery(name=Goal.FIND_GOAL_REPORTS, query="Select new com.pluralsight.model.GoalReport(g.minutes,e.minutes,e.activity)"+
//		"from Goal g ,Exercise e where g.Id=e.goal.Id"),
//		@NamedQuery(name=Goal.FIND_ALL_GOALS,query="Select g from Goal g")
//})
public class Goal {
	public static final String FIND_GOAL_REPORTS="findGoalReports";
	public static final String FIND_ALL_GOALS="findAllGoals";
	
	@Id
	@GeneratedValue
	@Column(name="GOAL_ID")
	private Long Id;
	@Range(min = 1, max = 120)
	private int minutes;
	
	@OneToMany(mappedBy="goal", cascade=CascadeType.ALL,fetch=FetchType.LAZY)
	private List<Exercise> exercise=new ArrayList<Exercise>();

	/**
	 * @return the id
	 */
	public Long getId() {
		return Id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		Id = id;
	}

	/**
	 * @return the exercise
	 */
	public List<Exercise> getExercise() {
		return exercise;
	}

	/**
	 * @param exercise the exercise to set
	 */
	public void setExercise(List<Exercise> exercise) {
		this.exercise = exercise;
	}

	public int getMinutes() {
		return minutes;
	}

	public void setMinutes(int minutes) {
		this.minutes = minutes;
	}
	
}
