package com.myheart.patient.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.myheart.patient.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {}